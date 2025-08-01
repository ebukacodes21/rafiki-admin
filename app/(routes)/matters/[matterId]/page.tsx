"use client";

import { useState, useEffect } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas, routes } from "@/constants";
import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { apiCall, formatError } from "@/utils/helper";
import { MatterSchema } from "@/schema";
import { useAppSelector } from "@/redux/hooks/useSelectorHook";
import { selectCurrentFirm } from "@/redux/features/firm";
import { useRouter, useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type FormData = z.infer<typeof MatterSchema>;

export default function AddNewMatterPage() {
  const router = useRouter();
  const params = useParams();
  const firm = useAppSelector(selectCurrentFirm);
  const [tab, setTab] = useState<string>("overview");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const isEdit = params?.matterId && params.matterId !== "new";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(MatterSchema),
    defaultValues: {
      title: "",
      description: "",
      area:
        isEdit && firm?.matters
          ? firm.matters.find((m) => m.id === params?.matterId)?.area ?? ""
          : "",
      events: [],
      parties: [],
      charge: {
        type: "Flat",
        amount: 0,
        vat: 0,
        discount: 0,
      },
    },
  });

  const {
    fields: eventFields,
    append: appendEvent,
    remove: removeEvent,
  } = useFieldArray({ control, name: "events" });

  const {
    fields: partyFields,
    append: appendParty,
    remove: removeParty,
  } = useFieldArray({ control, name: "parties" });

  useEffect(() => {
    if (!loaded && isEdit && firm?.matters) {
      const matter = firm.matters.find((m) => m.id === params?.matterId);
      if (matter) {
        setValue("title", matter.title);
        setValue("description", matter.description);
        setValue("area", matter.area ?? "");

        setValue(
          "parties",
          matter.parties?.map((p) => ({
            name: p.name,
            role: p.role,
            email: p.email || "",
            phone: p.phone || "",
            address: p.address || "",
          })) || []
        );

        setValue(
          "events",
          matter.events?.map((e) => ({
            title: e.name,
            date: new Date(e.date).toISOString(),
          })) || []
        );

        if (matter.charge) {
          setValue("charge", {
            type: matter.charge.type,
            amount: matter.charge.amount,
            vat: matter.charge.vat,
            discount: matter.charge.discount,
          });
        }

        setLoaded(true);
      }
    }
  }, [loaded, isEdit, params.matterId, firm, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const transformed = {
      ...data,
      firmId: firm?.id,
      parties: data.parties?.map((p) => ({
        name: p.name,
        role: p.role,
        email: p.email,
        address: p.address,
        phone: p.phone,
      })),
      events: data.events?.map((e) => ({
        name: e.title,
        date: new Date(e.date),
      })),
    };

    let result;
    if (isEdit) {
      result = await apiCall(
        `/api/edit-matter?matterId=${params.matterId}`,
        "PATCH",
        transformed
      );
    } else {
      result = await apiCall("/api/create-matter", "POST", transformed);
    }

    setLoading(false);
    if (result.name === "AxiosError") {
      toast.error(formatError(result));
      return;
    }

    toast.success(result.message);
    router.push(routes.MATTERS);
    router.refresh();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex w-full max-w-6xl gap-6 mx-auto mt-8">
        <Card className="w-full">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="mb-4 flex flex-wrap">
                  <TabsTrigger className="cursor-pointer" value="overview">
                    <EyeIcon className="w-5 h-5 mr-1 text-sky-500" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="documents">
                    <DocumentTextIcon className="w-5 h-5 mr-1 text-indigo-500" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="calendar">
                    <CalendarDaysIcon className="w-5 h-5 mr-1 text-emerald-500" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="parties">
                    <UsersIcon className="w-5 h-5 mr-1 text-violet-500" />
                    Parties
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="bill">
                    <UsersIcon className="w-5 h-5 mr-1 text-violet-500" />
                    Bill of Charges
                  </TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Matter Title:</Label>
                      <Input id="title" {...register("title")} />
                      {errors.title && (
                        <p className="text-sm text-red-500">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description:</Label>
                      <Textarea id="description" {...register("description")} />
                    </div>

                    <div className="space-y-2">
                      <Label>Practice Area:</Label>
                      <Controller
                        name="area"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue placeholder="Select Practice Area" />
                            </SelectTrigger>
                            <SelectContent>
                              {areas.map((area) => (
                                <SelectItem key={area.label} value={area.label}>
                                  {area.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.area && (
                        <p className="text-sm text-red-500">
                          {errors.area.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents">
                  <div className="space-y-2">
                    <Label>Upload Files</Label>
                    <Input type="file" className="w-64 cursor-pointer" />
                  </div>
                </TabsContent>

                {/* Calendar */}
                <TabsContent value="calendar">
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendEvent({ title: "", date: "" })}
                      className="cursor-pointer"
                    >
                      <PlusSmallIcon className="w-4 h-4 mr-1" />
                      Add Event
                    </Button>
                    {eventFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-2 gap-2 items-end"
                      >
                        <div className="space-y-2">
                          <Label>Event Title:</Label>
                          <Input
                            {...register(`events.${index}.title`)}
                            placeholder="e.g. Hearing"
                          />
                          {errors.events?.[index]?.title && (
                            <p className="text-sm text-red-500">
                              {errors.events[index]?.title?.message}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="space-y-2">
                            <Label>Event Date:</Label>
                            <Controller
                              control={control}
                              name={`events.${index}.date`}
                              render={({ field }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full cursor-pointer justify-start text-left font-normal"
                                    >
                                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                                      {field.value
                                        ? format(new Date(field.value), "PPP")
                                        : "Select a date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date?.toISOString() || ""
                                        )
                                      }
                                      disabled={(date) => date < new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                            {errors.events?.[index]?.date && (
                              <p className="text-sm text-red-500">
                                {errors.events[index]?.date?.message}
                              </p>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => removeEvent(index)}
                            className="text-red-500 col-span-2 text-left cursor-pointer"
                            aria-label="Remove event"
                          >
                            <TrashIcon className="w-4 h-4 mr-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Parties */}
                <TabsContent value="parties">
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        appendParty({
                          name: "",
                          role: "Client",
                          email: "",
                          phone: "",
                          address: "",
                        })
                      }
                      className="cursor-pointer"
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Party
                    </Button>

                    {partyFields.map((field, index) => (
                      <Card key={field.id} className="border shadow-sm">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg">
                              Party {index + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => removeParty(index)}
                              className="text-red-500"
                              aria-label="Remove party"
                            >
                              <TrashIcon className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label>Name:</Label>
                              <Input
                                {...register(`parties.${index}.name`)}
                                placeholder="e.g. ABC Ltd"
                              />
                              {errors.parties?.[index]?.name && (
                                <p className="text-sm text-red-500">
                                  {errors.parties[index]?.name?.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <Label>Email:</Label>
                              <Input
                                {...register(`parties.${index}.email`)}
                                placeholder="e.g. contact@abc.com"
                              />
                              {errors.parties?.[index]?.email && (
                                <p className="text-sm text-red-500">
                                  {errors.parties[index]?.email?.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <Label>Phone:</Label>
                              <Input
                                {...register(`parties.${index}.phone`)}
                                placeholder="e.g. 1234567890"
                              />
                              {errors.parties?.[index]?.phone && (
                                <p className="text-sm text-red-500">
                                  {errors.parties[index]?.phone?.message}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <Label>Role:</Label>
                              <Select
                                onValueChange={(val) =>
                                  setValue(`parties.${index}.role`, val, {
                                    shouldValidate: true,
                                  })
                                }
                                value={watch(`parties.${index}.role`)}
                              >
                                <SelectTrigger className="w-full cursor-pointer">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "Client",
                                    "Defendant",
                                    "Opposing Counsel",
                                    "Judge",
                                    "Magistrate",
                                    "Umpire",
                                  ].map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label>Address:</Label>
                            <Textarea
                              {...register(`parties.${index}.address`)}
                              placeholder="e.g. 123 Main St, City, Country"
                            />
                            {errors.parties?.[index]?.address && (
                              <p className="text-sm text-red-500">
                                {errors.parties[index]?.address?.message}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bill">
                  <Card className="border shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <Label>Type:</Label>
                          <Controller
                            control={control}
                            name={`charge.type`}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full cursor-pointer">
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Flat">
                                    Flat Rate
                                  </SelectItem>
                                  <SelectItem value="Hourly">Hourly</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label>Amount:</Label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`charge.amount`, {
                              valueAsNumber: true,
                            })}
                            placeholder="e.g. 100"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label>VAT %:</Label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`charge.vat`, { valueAsNumber: true })}
                            placeholder="e.g. 15"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label>Discount %:</Label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`charge.discount`, {
                              valueAsNumber: true,
                            })}
                            placeholder="e.g. 5"
                          />
                        </div>
                      </div>

                      {/* Total */}
                      <div className="pt-2">
                        <p className="text-sm">
                          Final Total:{" "}
                          <span className="font-medium">
                            {(() => {
                              const amount = watch("charge.amount") || 0;
                              const vat = watch("charge.vat") || 0;
                              const discount = watch("charge.discount") || 0;
                              const vatAmount = (amount * vat) / 100;
                              const discountAmount = (amount * discount) / 100;
                              const total = amount + vatAmount - discountAmount;
                              return total.toFixed(2);
                            })()}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading
                  ? isEdit
                    ? "Updating..."
                    : "Adding..."
                  : isEdit
                  ? "Update Matter"
                  : "Add Matter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
