// Shrinks a CAD export (.glb) for the web 3D viewer.
// Usage: node scripts/optimize-model.mjs path/to/export.glb public/models/a10.glb
//
// Drops CAD edge lines and points, merges parts, simplifies the mesh, quantizes it
// (no decoder needed in the browser), gives it one livery-navy material and turns
// the model from Z-up (CAD) to Y-up (web).
import { NodeIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";
import { prune, dedup, weld, simplify, quantize, flatten, join } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: node scripts/optimize-model.mjs <input.glb> <output.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
const doc = await io.read(input);
const TRIANGLES = 4;

for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    if (prim.getMode() !== TRIANGLES) {
      mesh.removePrimitive(prim);
      prim.dispose();
    }
  }
}

const material = doc.createMaterial("a10").setBaseColorFactor([0.11, 0.14, 0.25, 1]).setMetallicFactor(0.55).setRoughnessFactor(0.42);
for (const mesh of doc.getRoot().listMeshes()) for (const prim of mesh.listPrimitives()) prim.setMaterial(material);

await MeshoptSimplifier.ready;
await doc.transform(prune(), dedup(), flatten(), join(), weld(), simplify({ simplifier: MeshoptSimplifier, ratio: 0.1, error: 0.004 }), prune(), quantize());

const scene = doc.getRoot().listScenes()[0];
const upright = doc.createNode("z-up-to-y-up").setRotation([-Math.SQRT1_2, 0, 0, Math.SQRT1_2]);
for (const node of scene.listChildren()) {
  scene.removeChild(node);
  upright.addChild(node);
}
scene.addChild(upright);

await io.write(output, doc);
console.log(`model written to ${output}`);
