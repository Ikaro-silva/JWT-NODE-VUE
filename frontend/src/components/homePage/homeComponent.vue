<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand">JWT + Node + Vue</a>
                <div
                    class="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="btn btn-danger"  @click="logOutUser">SAIR</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="list-group">
                            <li class="list-group-item">Name: {{ user.name }}</li>
                            <li class="list-group-item">E-mail: {{ user.email }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import swal from 'sweetalert'
    import VueJwtDecode from 'vue-jwt-decode'
    export default{
        name:'Home',
        data(){
            return{
                user:{
                    
                }
            }
        },
        methods:{
            
             getUser(){
                
                const token = localStorage.getItem('jwt');
                const tokenDecoded = VueJwtDecode.decode(token);
                
                this.user = tokenDecoded;
            },

            logOutUser(){
                swal({
                    title: 'Deseja sair da pagina ?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true
                    })
                    .then((result) => {
                            if (result) {
                                swal('Saindo da pagina', 'Retornado ao login', 'success');
                                localStorage.removeItem('jwt')
                                this.$router.push('/')
                                
                            } else {
                                swal('Cancelado', 'Cotinue navegando', 'info');
                            }
                    });
                    
            }
        },
        mounted(){
            this.getUser()
        }
    }
</script>