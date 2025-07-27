// import { NextResponse, NextRequest } from "next/server";
// import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { Pinecone, PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
// import { Document } from "langchain/document";
// import { FeatureExtractionPipeline, pipeline } from "@huggingface/transformers";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { BATCH_SIZE } from "@/constants";

import { NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//   const { indexName, namespace } = await request.json();

//   const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();
//       const send = (data: any) =>
//         controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));

//       try {
//         send({ status: "loading_documents" });

//         const loader = new DirectoryLoader("./documents", {
//           ".pdf": (path: string) => new PDFLoader(path, { splitPages: false }),
//           ".txt": (path: string) => new TextLoader(path),
//         });

//         const docs = await loader.load();
//         send({ status: "documents_loaded", documentsCount: docs.length });

//         const client = new Pinecone({ apiKey: process.env.PINECONE_SK! });

//         const modelname = "mixedbread-ai/mxbai-embed-large-v1";
//         const extractor = await pipeline("feature-extraction", modelname, {
//           progress_callback: (progress) => {
//             send({ status: progress.status, progress });
//           },
//           dtype: "fp32",
//         });

//         for (const doc of docs) {
//           await processDocument(client, indexName, namespace, doc, extractor, send);
//         }

//         send({
//           status: "complete",
//           success: true,
//         });

//         controller.close();
//       } catch (error: any) {
//         send({ error: error.message || error.toString() });
//         controller.close();
//       }
//     },
//   });

//   return new NextResponse(stream, {
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "Transfer-Encoding": "chunked",
//     },
//   });
// }

// async function processDocument(
//   c: Pinecone,
//   indexName: string,
//   namespace: string,
//   d: Document,
//   e: FeatureExtractionPipeline,
//   log: (data: any) => void
// ) {
//   const splitter = new RecursiveCharacterTextSplitter();
//   const docuChunks = await splitter.splitText(d.pageContent);
//   const totalChunks = docuChunks.length;
//   let uploadedChunks = 0;

//   const filename = getFilename(d.metadata.source);
//   let batchIndex = 0;

//   while (docuChunks.length > 0) {
//     batchIndex++;
//     const batch = docuChunks.splice(0, BATCH_SIZE);
//     await processOneBatch(c, indexName, namespace, e, batch, batchIndex, filename);
//     uploadedChunks += batch.length;

//     log({
//       status: "uploading",
//       file: filename,
//       batch: batchIndex,
//       uploadedChunks,
//       totalChunks,
//     });
//   }
// }

// function getFilename(key: string) {
//   const doc = key.substring(key.lastIndexOf("/") + 1);
//   return doc.substring(0, doc.lastIndexOf(".")) || doc;
// }

// async function processOneBatch(
//   c: Pinecone,
//   indexName: string,
//   namespace: string,
//   e: FeatureExtractionPipeline,
//   batch: string[],
//   batchIndex: number,
//   filename: string
// ) {
//   const output = await e(batch.map((s) => s.replace(/\n/g, " ")), {
//     pooling: "cls",
//   });

//   const embeddingBatch = output.tolist();
//   const vectorBatch: PineconeRecord<RecordMetadata>[] = [];

//   for (let i = 0; i < batch.length; i++) {
//     const chunk = batch[i];
//     const embedding = embeddingBatch[i];

//     vectorBatch.push({
//       id: `${filename}-${batchIndex}-${i}`,
//       values: embedding,
//       metadata: { chunk },
//     });
//   }

//   const index = c.Index(indexName).namespace(namespace);
//   await index.upsert(vectorBatch);
// }

export async function POST(request: NextRequest) {

}