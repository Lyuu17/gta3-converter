<template>
  <main class="flex justify-center">
    <div class="flex flex-col w-1/3 h-96">
      <p class="text-center">Input</p>

      <textarea 
        v-model="inputText"
        cols="6" rows="20">
        
      </textarea>
    </div>

    <div class="flex flex-col w-1/3 h-96">
      <p class="text-center">Output</p>

      <textarea
        v-model="outputText"
        cols="6" rows="20">
        
      </textarea>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";

import Quaternion from "quaternion";

const inputText = ref(""), outputText = ref("");

const toDegrees = angle => angle * (180 / Math.PI);

watch(inputText, (newInput, oldInput) => {
  let inputSplit = newInput.split("\n");
  inputSplit = inputSplit
    .filter(e => e.length > 0) // remove empty
    .filter(e => !e.startsWith("#")) // remove comments
    .filter(e => !(e.startsWith("inst") || e.startsWith("cull") || e.startsWith("pick") || e.startsWith("end"))) // remove crap

  inputSplit = inputSplit.map(e => {
    const lineSplit = e.split(",").map(e => Number(e.trim()));

    const model = lineSplit[0];
    const trans = {x: lineSplit[2], y: lineSplit[3], z: lineSplit[4]};
    const scale = {x: lineSplit[5], y: lineSplit[6], z: lineSplit[7]};
    const axis = {x: lineSplit[8], y: lineSplit[9], z: lineSplit[10]};
    const angle = lineSplit[11];

    let q = new Quaternion({x: axis.x, y: axis.y, z: -axis.z, w: angle});
    let { roll, pitch, yaw } = q.toEuler();

    return `createBuilding(${model}, new Vector(${trans.x}, ${trans.y}, ${trans.z}), new Vector(${roll}, ${pitch}, ${yaw}));`;
  });

  outputText.value = inputSplit.join("\n");
})

</script>

<style scoped>
textarea {
  margin: 4px;
}
</style>