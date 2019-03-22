const logo = new Vue({
    el: '#app',
    data:
    {
        active: false
    },

    methods:
    {
        MouseOnLogo: function ()
        {
            this.active = !this.active;
        },
    },
    computed: 
    {
        LogoGetColor: function ()
        {
            if (active)
                return {'background-color': '#fc1cad'}
            else
                return {'background-color': 'black'}
        }
    }
});