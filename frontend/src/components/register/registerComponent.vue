<template>
   <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                    <Form class=" border border-primary p-5"
                    style="margin-top: 70px;height: auto;padding-top: 100px;inportant;"
                    @submit.prevt="submitRegister">
                    <!-- INICIO BLOCO NOME -->
                    <div>
                        <label for="">Nome</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            class="form-control mb-2"
                            placeholder="digite seu nome"
                            :rules="validate"
                            v-model="formUser.name"
                        />
                        <ErrorMessage name="name"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- INICIO DO BLOCL EMAIL -->
                    <div>
                        <label for="">Email</label>
                        <Field
                            type="email"
                            id="emai"
                            name="email"
                            class="form-control mb-2"
                            placeholder="digite seu email"
                            :rules="validateEmail"
                            v-model="formUser.email"
                        />
                        <ErrorMessage name="email"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- INICIO DO BLOCO PASSWORD -->
                    <div>
                        <label for="">Password</label>
                        <Field
                        type="password"
                        id="password"
                        name="password"
                        class="form-control mb-2"
                        placeholder="Digite sua senha"
                        :rules="validatePassword"
                        v-model="formUser.password"
                        />
                        <ErrorMessage name="password"
                        class="form-control is-invalid text-danger"
                        />
                    </div>
                    <!-- BLOCO BUTTON -->
                    <div class="d-grid gap-2 col-6 mx-auto"
                    style="margin-top: 20px;">
                        <button @click="RegisterUser"
                        class="btn btn-primary ">
                        Cadastrar
                        </button>
                    </div>

                    <p class="text-center my-2"> 
                        <router-link
                            to="/"
                            style="color:black;">
                            Login
                        </router-link>
                    </p>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import swal from 'sweetalert';
    import service from '../../service/controller'
    import{Form,Field,ErrorMessage, validate} from 'vee-validate'
    export default{
        components:{Form,Field,ErrorMessage},
        name:'Registe',
        data(){
            return{
                formUser:{
                    name:null,
                    email:null,
                    password:null
                }
                   
            
            }
        },
        methods:{
            submitRegister(){},
            async RegisterUser(){
                try{
                    await service.register(this.formUser)
                    swal({
                        title: 'Excelente!',
                        text: 'Usuário(a) cadastrado com sucesso!',
                        icon: 'success',
                    }).then(()=>{
                        this.$router.push('/');
                    })
                }catch(error){
                        swal({
                        title: 'Erro!',
                        text: 'Nome ou Email ja cadastrados!!',
                        icon: 'error',
                    });
                }
                
            },

            validateEmail(value){
                if (!value) {
                    return 'Campo obrigatorio';
                }
                
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regex.test(value)) {
                    return 'Este tipo de Email é invalido!';
                }
                // All is good
                return true;
            },
            
            validatePassword(value){
                if(!value){
                    return 'Campo obrigatorio!'
                }
                
                if(value.includes(' ')){
                    return "Senha não pode obter espaços"
                }
                if(value.length<=8 && value.length>=6){
                    return true
                }
                return 'A senha deve obter entre 6 e 8 caracters!'
                
            },

            validate(value){
                if(value){
                    return true
                }
                return "Campo obrigatorio"
            }

        }
}
</script>