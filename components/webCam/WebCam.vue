<template>
  <dialog :id="id" :ref="ref" class="modal " @keydown.esc="mdl.modalWebCamToggle(id || '')">
    <div class="z-80 fixed w-screen h-screen bg-black">
      <div class=" flex justify-center">
        <video class="camera-video" ref="camera" autoplay playsinline></video>
        <canvas id="photoTaken" hidden class="canvas-photo" ref="canvas"></canvas>
        <div class="fixed h-[8rem] bottom-0 right-0 left-0">
          <div class="flex items-center justify-center h-full bg-black">
            <div class="flex items-center justify-between p-8 align-center w-80">
              <button @click="mdl.modalWebCamToggle(id || '')" :id="'closeBtn' + id" class="text-white">
                <Icon name="material-symbols:close" class="w-10 h-10"></Icon>
              </button>
              <button class="text-white" @click="takePhoto">
                <Icon name="material-symbols:camera" class="h-10 w-10"></Icon>
              </button>
              <button @click="switchCamera" class="text-white">
                <Icon name="material-symbols:flip-camera-android-rounded" class="w-10 h-10"></Icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineEmits, watch } from 'vue';

const mdl = useUtilStore()
const props = defineProps({
  id: {
    type: String
  },
  ref: {
    type: String
  },
  classPanel: {
    type: String,
    default: "max-w-screen"
  },
  title: {
    type: String,
    default: ""
  },
  loading: {
    type: Boolean,
  }
})

onMounted(() => {
  camera.value.addEventListener('loadedmetadata', updateCanvasSize);
  window.addEventListener('resize', updateCanvasSize);
})

const emit = defineEmits(['photoTaken']);

const isCameraOpen: any = ref(false);
const isPhotoTaken: any = ref(false)

const isCameraBelakang: any = ref(true)
const camera: any = ref(null);
const canvas: any = ref(null);

watch(() => mdl.isShowModalWebCam, (newValue, oldValue) => {
  if (!newValue) {
    isCameraOpen.value = false;
    isPhotoTaken.value = false;
    stopCameraStream();
  } else {
    isCameraOpen.value = true;
    createCameraElement();
  }
});

const createCameraElement = () => {
  const constraints = {
    audio: false,
    video: {
      facingMode: 'environment', // 'environment' for rear camera, 'user' for front camera
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      camera.value.srcObject = stream;
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

const stopCameraStream = () => {
  const tracks: MediaStreamTrack[] = (camera.value.srcObject as MediaStream).getTracks();

  tracks.forEach((track: MediaStreamTrack) => {
    track.stop();
  });
}

const switchCamera = () => {
  isCameraBelakang.value = !isCameraBelakang.value
  const constraints = {
    audio: false,
    video: {
      facingMode: isCameraBelakang.value ? 'environment' : 'user', // Switch between front and rear camera
    },
  };

  stopCameraStream();

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      camera.value.srcObject = stream;
    })
    .catch(error => {
      console.error("Error switching camera: ", error);
    });
}

const takePhoto = () => {

  const context = canvas.value.getContext('2d');
  const photoFromVideo = camera;
  context.drawImage(photoFromVideo.value, 0, 0, canvas.value.width, canvas.value.height);

  emit('photoTaken', canvas.value.toDataURL());
  mdl.modalWebCamToggle(props.id || '')

}

const updateCanvasSize = () => {
  canvas.value.width = camera.value.videoWidth;
  canvas.value.height = camera.value.videoHeight;
}

</script>
