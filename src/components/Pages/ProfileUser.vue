<template>
  <div class="w-full">
    <div class="flex flex-wrap">
      <div class="lg:w-2/12 w-1/12"></div>

      <div class="lg:w-8/12 w-10/12 animate-fade-left bg-white rounded-lg shadow-md mt-10">
        <div class="text-center mt-5 animate-fade-left hidden">
          Anda Belum Memiliki Pesanan
        </div>

        <div class="text-center mt-5 animate-fade-left ">
          <i class="fas fa-user" style="font-size: 100px;"></i>
        </div>

        <div class="flex flex wrap">
          <div class="w-full text-right pr-2" v-if="disableInput">
            <button @click="disableInput = false">Edit Profile</button>
          </div>

          <div class="w-full text-right pr-2" v-if="!disableInput">
            <div class="flex flex-wrap">
              <div class="w-8/12">
              </div>

              <div class="w-2/12">
                <button @click="handleUbah">Cancel</button>
              </div>

              <div class="w-2/12">
                <button @click="handleUbah">Save Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap pb-3 pt-2 border-b-2 px-2" >
          <div class="w-full">
            <label for="">Nama</label>
            <input type="text" name="" id="" class="w-full" v-model="nama" :readonly="disableInput">
          </div>

          <div class="w-full mb-3"></div>

          <div class="w-full">
            <label for="">Email</label>
            <input type="text" name="" id="" class="w-full" v-model="email" :readonly="disableInput">
          </div>

          <div class="w-full mb-3"></div>

          <div class="w-full">
            <label for="">Kode Pelanggan</label>
            <input type="text" name="" id="" class="w-full" v-model="pelanggan_id" readonly>
          </div>

          <div class="w-full mb-3"></div>


          <div class="w-full">
            <label for="">Tanggal Pembuatan Akun</label>
            <input type="text" name="" id="" class="w-full" v-model="created_at" readonly>
          </div>


          <div class="w-full mb-5"></div>




        </div>
      </div>

      <div class="lg:w-2/12 w-1/12"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-user',
  data : function() {
    return {
      nama: '',
      email: '',
      pelanggan_id: '',
      created_at: '',
      idUser: '',
      disableInput: true

    }
  },
  mounted: function(){



  },
  methods: {
    loadData: function(){

    },
    handleUbah: function(){
      this.disableInput = true
    }
  }
}
</script>

<style scoped>
input, input:focus {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom:0.5px solid black;
  box-shadow: none !important;
}

/* div {
  border: 1px solid black;
} */

</style>