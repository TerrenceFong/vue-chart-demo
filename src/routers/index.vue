<!--  scoped => 局部有效  -->
<style scoped>
    /*h1{
        color: #28a7e1;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        margin-top: 100px;
    }
    a{
        display: block;
        text-align: center;
        margin-top: 10px;
    }*/
</style>
<template>
    <h1>Hello</h1>
    <a v-link="{ name: 'chart', params: { username: 'cchart' }}">打开图表页</a>
    <div>
        <p>当前路径: {{$route.path}}</p>
        <p>当前auth: {{$route.auth}}</p>
        <p>当前路由参数: {{$route.params | json}}</p>
        <p>路由中查询参数的键值对: {{$route.query | json}}</p>
        <p>路由规则所属的路由器: {{$route.router}}</p>
        <p>所有片段所对应的配置参数对象: {{$route.matched | json}}</p>
        <p>当前路径的名字: {{$route.name}}</p>
    </div><br>


    <div class="container">
        <span id="message">{{ msg | json }}</span>
    </div>
    <div class="container">
        <div class="account-info">
            <span v-if="userName">{{ userName }} | <a href="#" @click="logout">Logout</a></span>
            <span v-else><a href="#" @click="popupLogin">Login</a> | <a href="#" @click="popupRegister">Register</a></span>
        </div>
    </div>

    <simple-grid :data-list="gridData" :columns="gridColumns" @load-entry="loadCustomer" v-on:delete-entry="deleteCustomer"></simple-grid>

    <div class="container">
        <div class="form-group">
            <button @click="this.show = true">Create</button>
        </div>
    </div>

    <div class="container">
        <div class="form-group">
            <button @click="getCustomers">get</button>
        </div>
    </div>

    <modal-dialog v-bind:show.sync="show">

        <header class="dialog-header" slot="header">
            <h1 class="dialog-title">{{ item.customerId ? 'Edit Customer - ' + item.contactName : 'Create New Customer' }}</h1>
        </header>

        <div class="dialog-body" slot="body">
            <div v-show="item.customerId" class="form-group">
                <label>Customer Id</label>
                <input type="text" v-model="item.customerId" disabled="disabled" />
            </div>
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" v-model="item.companyName" />
            </div>

            <div class="form-group">
                <label>Contact Name</label>
                <input type="text" v-model="item.contactName" />
            </div>

            <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="item.phone" />
            </div>
            <div class="form-group">
                <label></label>
                <button @click="saveCustomer">Save</button>
            </div>
        </div>

    </modal-dialog>

    <modal-dialog v-bind:show.sync="showLogin">
        <header class="dialog-header" slot="header">
            <h1 class="dialog-title">Login</h1>
        </header>

        <div class="dialog-body" slot="body">
            <div class="form-group">
                <label>Email</label>
                <input type="text" v-model="loginModel.username" placeholder="12345@qq.qq"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" v-model="loginModel.password" placeholder="Aa123456`" />
            </div>
            <div class="form-group">
                <label></label>
                <button @click="login">Login</button>
            </div>
        </div>
    </modal-dialog>

    <modal-dialog v-bind:show.sync="showRegister">
        <header class="dialog-header" slot="header">
            <h1 class="dialog-title">Register</h1>
        </header>

        <div class="dialog-body" slot="body">
            <div class="form-group">
                <label>Email</label>
                <input type="text" v-model="registerModel.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" v-model="registerModel.password" />
            </div>

            <div class="form-group">
                <label>Confirm Password</label>
                <input type="text" v-model="registerModel.confirmPassword" />
            </div>

            <div class="form-group">
                <label></label>
                <button @click="register">Register</button>
            </div>
        </div>
    </modal-dialog>

    <div id="help">
        <loading v-show="showLoading" ></loading>
        <modal-dialog :show="showDialog">
            <header class="dialog-header" slot="header">
                <h1 class="dialog-title">Server Error</h1>
            </header>
            <div class="dialog-body" slot="body">
                <p class="error">Oops,服务器发生一些错误, 错误代码: {{errorCode}}.</p>
            </div>
        </modal-dialog>
    </div>

</template>
<script>
    // import Vue from 'vue'
    import Loading from '../components/loading.vue'
    import ModalDialog from '../components/modalDialog.vue'
    import SimpleGrid from '../components/simpleGrid.vue'

    module.exports = {
        components: {
            'loading':Loading,
            'simple-grid':SimpleGrid,
            'modal-dialog':ModalDialog,
        },
        data: function() {
            return {
                show: false,
                // gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
                gridColumns: [
                    {name: 'customerId', isKey: true},
                    {name: 'companyName'}, 
                    {name: 'contactName'}, 
                    {name: 'phone'}
                ],
                gridData: [],
                apiUrl: 'http://211.149.193.19:8100/api/customers',
                // apiUrl: 'http://211.149.193.19:8080/api/customers',
                // apiUrl: 'http://211.149.193.19:8080/api/customers{/id}',
                item: {},

                showLoading: false,
                showDialog: false,
                errorCode: '',

                showLogin: false,
                showRegister: false,
                registerUrl: 'http://211.149.193.19:8100/api/Account/Register',
                loginUrl: 'http://211.149.193.19:8100/token',
                logoutUrl: 'http://211.149.193.19:8100/api/Account/Logout',
                registerModel: {
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                loginModel: {
                    username: '',
                    password: '',
                    grant_type: 'password'
                },
                msg: '',
                userName: ''
            }
        },
        ready: function() {
            this.getCustomers()
            this.userName = sessionStorage.getItem('userName')
        },
        beforeDestroy: function() {

        },
        watch: {
            'show': function(newVal, oldVal) {
                if (!newVal) {
                    this.item = {}
                }
            }
        },
        methods: {
            popupRegister: function() {
                this.showRegister = true
            },
            popupLogin: function() {
                this.showLogin = true
            },
            register: function() {
                this.$http.post(this.registerUrl, this.registerModel).then((response) => {
                    this.showRegister = false
                    this.msg = '注册成功！'
                }).catch((response) => {
                    this.msg = response.json()
                })
            },
            login: function() {
                this.$http.post(this.loginUrl, this.loginModel).then((response) => {
                    var body = response.body
                    // var body = response.json()
                    console.log(response);
                    console.log(body);
                    this.userName = body.userName
                    this.showLogin = false
                    this.msg = '登录成功！'

                    sessionStorage.setItem('accessToken', body.access_token)
                    sessionStorage.setItem('userName', body.userName)
                }).catch(this.requestError)
            },
            logout: function() {
                this.$http.post(this.logoutUrl).then((response) => {
                    this.msg = '注销成功！'
                    this.result = ''
                    this.userName = ''
                    this.loginModel.username = ''
                    this.loginModel.password = ''
                    
                    sessionStorage.removeItem('userName')
                    sessionStorage.removeItem('accessToken')
                }).catch(this.requestError)
            },
            requestError: function(response) {
                this.msg = response.json()
            },
            closeDialog: function() {
                this.show = true
                console.log("this.show:"+this.show)
            },
            loadCustomer: function(customerId) {
                var vm = this
                vm.gridData.forEach(function(item) {
                    if (item.customerId === customerId) {
                        vm.$set('item', item)
                        vm.$set('show', true)
                        return
                    }
                })
            },
            saveCustomer: function() {
                this.item.customerId ? this.updateCustomer() : this.createCustomer()
                this.show = false
            },
            getCustomers: function() {
                var _this = this;

                // // get
                _this.$http.get(_this.apiUrl).then((response) => {
                    // success callback
                    _this.$set('gridData', response.data)

                    console.log(response)
                    // get status
                    // console.log(response.status);

                    // get status text
                    // console.log(response.statusText);
                }, (response) => {
                    // error callback
                }).catch(function(response) {
                    console.log("error:")
                    console.log(response)
                })
                // jsonp
                // _this.$http.jsonp(_this.apiUrl).then(function(response){
                //     _this.$set('gridData', response.data)
                //     // console.log("jsonp:"+_this.gridData[0].customerId)
                // })
            },
            createCustomer: function() {
                var _this = this
                _this.$http.post(_this.apiUrl, _this.item).then((response) => {
                    _this.$set('item', response)
                    _this.getCustomers()
                    console.log("create ok")
                    console.log(_this.item)
                })
                // .catch(function(response) {
                //     console.log("error:")
                //     console.log(response)
                // })
                this.show = false
            },
            updateCustomer: function() {
                var vm = this
                vm.$http.put(this.apiUrl + '/' + vm.item.customerId, vm.item).then((response) => {
                    vm.getCustomers()
                    console.log("update ok")
                })
            },
            // deleteCustomer: function(customer){
            //     var vm = this
            //     vm.$http.delete(this.apiUrl + '/' + customer.customerId).then((response) => {
            //         vm.getCustomers()
            //         console.log("delete ok")
            //     })
            // },
            deleteCustomer: function(customer) {
                this.$http.delete(this.apiUrl + '/' + customer.customerId).then((response) => {
                    this.getCustomers()
                })
            },
            // getCustomers: function() {    
            //     var resource = this.$resource(this.apiUrl)        
            //     var vm = this 
            //     resource.get().then((response) => {            
            //         vm.$set('gridData', response.data)
            //         console.log(this.gridData)
            //     }).catch(function(response) {
            //         console.log(response)
            //     })
            // },
            // createCustomer: function() {    
            //     var resource = this.$resource(this.apiUrl)        
            //     var vm = this            
            //     resource.save(vm.apiUrl, vm.item)        
            //     .then((response) => {            
            //         vm.$set('item', {

            //         })            
            //         vm.getCustomers()        
            //     })    
            //     this.show = false
            // },
            // updateCustomer: function() {    
            //     var resource = this.$resource(this.apiUrl)        
            //     var vm = this            
            //     resource.update({ 
            //             id: vm.item.customerId
            //         }, vm.item)        
            //         .then((response) => {            
            //             vm.getCustomers()        
            //         })
            // },
            // deleteCustomer: function(customer){    
            //     var resource = this.$resource(this.apiUrl)        
            //     var vm = this            
            //     resource.remove({ id: customer.customerId})        
            //     .then((response) => {            
            //         vm.getCustomers()        
            //     })
            // }
        },
        compiled: function() {
            var self = this;

            // self.createCustomer()

        }
    }
</script>