<template>
  <div class="w-full">
    <div class="flex flex-wrap">
      <div class="lg:w-2/12 w-1/12"></div>

      <div class="lg:w-8/12 w-10/12 animate-fade-left bg-white rounded-lg shadow-md mt-10">
        <div class="text-center mt-5 animate-fade-left hidden">
          Anda Belum Memiliki Pesanan
        </div>

        <div class="text-center mt-5 animate-fade-left -my-3">
          <img :src="loadFoto ? loadFoto : dataUser.foto ? getImg(dataUser.foto) : require('@/assets/profileabu.png')" alt="" class="mx-auto" style="border-radius: 50%; height: 150px; width: 150px;" >

          <br><br>
          <input type="file" :class="stateUbahPass ? ' hidden' : ''" name="" id="fileProfile" @change="handleProfile" v-if="!disableInput" style="border: 0;">
        </div>

        <div class="flex flex wrap">
          <div class="w-full text-right pr-2" v-if="disableInput">
            <button @click="handleBtnEdit">Edit Profile</button>
          </div>

          <div class="w-full text-right pr-2 mt-5" v-if="!disableInput">
            <button @click="stateUbahPass = true">Ubah Password?</button>
          </div>
        </div>

        <div class="flex flex-wrap pb-3 mt-1 border-b-2 px-2" v-if="!stateUbahPass">
          <div class="w-full">
            <label for="">Nama</label>
            <input type="text" name="" id="nama" class="w-full" v-model="nama" :readonly="disableInput">
          </div>

          <div class="w-full mb-3"></div>

          <div class="w-full">
            <label for="">Email</label>
            <input type="text" name="" id="" class="w-full" v-model="email" :readonly="true">
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



          <div class="w-full text-right pr-2 mt-5" v-if="!disableInput">
            <div class="flex flex-wrap">
              <div class="w-8/12">
              </div>

              <div class="w-2/12">
                <button @click="handleCancel">Cancel</button>
              </div>

              <div class="w-2/12">
                <button @click="handleUbah">Save Profile</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap pb-3 mt-5 border-b-2 px-2 " v-else>
          <div id="alertSalah" class="w-full hidden">
            <div class=" flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Password Anda Salah</span> Periksa Ulang Kembali.
              </div>
            </div>
          </div>

          <div class="w-full">
            <label for="">Input Password Lama</label>
            <input type="text" name="" id="" class="w-full" v-model="passwd" @input="inputPass">
          </div>

          <div class="w-full">
            <label for="">Input Password Baru</label>
            <input type="text" name="" id="" class="w-full">
          </div>

          <div class="w-full">
            <label for="">Konfirmasi Password Baru</label>
            <input type="text" name="" id="" class="w-full">
          </div>

          <div class="w-full text-right pr-2 mt-5">
            <div class="flex flex-wrap">
              <div class="w-8/12">
              </div>

              <div class="w-2/12">
                <button @click="handleCancel">Cancel</button>
              </div>

              <div class="w-2/12">
                <button @click="handleUbah">Save Profile</button>
              </div>
            </div>
          </div>

        </div>
      </div>



      <div class="lg:w-2/12 w-1/12"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import debounce from "lodash/debounce"

export default {
  name: 'profile-user',
  components: {
    // Message
  },
  data : function() {
    return {
      nama: '',
      email: '',
      pelanggan_id: '',
      created_at: '',
      idUser: '',
      disableInput: true,
      foto: null,
      loadFoto: null,
      token: localStorage.getItem("token") || "",
      dataUser: {},
      passwd: "",
      stateUbahPass: false,
      hideTimeout: null

    }
  },
  mounted: function(){
    this.loadData();
  },
  methods: {
    loadData: function(){
      axios.get(`http://localhost:5500/apiUser/me`, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        this.dataUser = res.data;

        this.nama = this.dataUser.nama;
        this.email = this.dataUser.email;
        this.pelanggan_id = this.dataUser.pelanggan_id;
        this.foto = this.dataUser.foto;
      }).catch((err) => {
        alert("Error");
        console.warn(err);
      });
    },
    // loadData: async function(){
    //   try {
    //     const resData = await axios.get(`http://localhost:5500/apiUser/me`, {
    //       headers: {
    //         Authorization: 'Bearer ' + this.token
    //       }
    //     });

    //     this.dataUser = resData.data;

    //     this.nama = this.dataUser.nama;
    //     this.email = this.dataUser.email;
    //     this.pelanggan_id = this.dataUser.pelanggan_id;
    //     this.foto = this.dataUser.foto;
        
    //     console.log(this.dataUser.foto)

    //   } catch (error) {
    //     console.warn(error);
    //     return null
    //   }
    // },
    handleUbah: function(){
      let formData = new FormData();
      formData.append('nama_user', this.nama);

      let inputFile = document.getElementById('fileProfile');

      if(inputFile.files.length > 0){
        formData.append('foto', this.foto);
      }

      axios.put(`http://localhost:5500/apiUser/updateMe`, formData, {
        headers: {
          Authorization: 'Bearer ' + this.token,
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        console.log(res.data);
        alert("Berhasil");
        this.disableInput = true;
        this.loadData();

      }).catch((err) => {
        alert("Error Update");
        console.warn(err);
      });
      
    },
    handleBtnEdit: function(){
      document.getElementById('nama').focus();
      this.disableInput = false
    },
    handleProfile: function(event){
      // Referensi :
      // https://stackoverflow.com/questions/49106045/preview-an-image-before-it-is-uploaded-vuejs
      this.loadFoto = URL.createObjectURL(event.target.files[0]);
      this.foto = event.target.files[0]; // ini buat dipassing ke FormData
      console.log(this.foto);
    },
    handleCancel: function(){
      this.disableInput = true;
      this.loadFoto = null;
      this.loadData();
    },
    // Bikin Delay. utk ngecek axios aje. pakai lodashjs
    inputPass: debounce(function(){
      axios.post('http://localhost:5500/apiUser/checkPass', {
        passwd: this.passwd
      }, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }).then((res) => {
        console.log(res);
        alert("Berhasil");
      }).catch((err) => {
        console.log(err);
        let alertSalah = document.getElementById('alertSalah');
        alertSalah.classList.remove('hidden');
        alertSalah.classList.add('hiddenAnimate');

        setTimeout(() => {
          alertSalah.classList.remove('hiddenAnimate')
          alertSalah.classList.add('hidden')
        }, 2000)
      })
    }, 800),

    getImg: function(foto){
      return `http://localhost:5500/apiUser/images/${foto}`
    }
  }
}
</script>

<style scoped>
input[type=text], input[type=text]:focus {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom:0.5px solid black;
  box-shadow: 0 2px 2px -2px gray;
}


/* div {
  border: 1px solid black;
} */

@keyframes showAndHide {
    0% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
}

.hiddenAnimate {
    animation: showAndHide 2s;
}

</style>