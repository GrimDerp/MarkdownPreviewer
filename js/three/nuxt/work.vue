<template>
    <div class="bg-black h-full min-h-screen v-full px-8 py-12">
        <h2 class="text-white font-maven text-8xl text-center"> Work work work</h2>
           
        
    <div class="flex space-x-3">
        <div v-for="n in 6">
       
            <img 
            src="~/assets/cboard.jpg" 
            alt="circuits"
            style="height: 50vh;"
            class="object-cover"
             />
     
  
            <p class="text-white font-maven text-sm">WEB</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            projects: [
                {
                    image: {
                      url: '~/assets/cboard.jpg'
                    },
                    title: 'WEB'
                }
            ]
        }
    }
}
</script>
