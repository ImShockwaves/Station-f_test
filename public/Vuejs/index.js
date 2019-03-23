const logo = new Vue({
    el: '#app',
    data:
    {
        active: false
    },

    computed: 
    {
        logoGetColor: function ()
        {
            if (this.active)
                return {'background-color': '#fc1cad'}
            else
                return {'background-color': 'black'}
        }
    }
});