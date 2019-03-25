const logo = new Vue({
    el: '#app',
    data:
    {
        rooms: [
            {
                name: 'roomA',
                capacity: 10,
                equipements : ['Tv', 'retro projecteur']
            },
            {
                name: 'roomB',
                capacity: 28,
                equipements : ['Tv']
            },
            {
                name: 'roomC',
                capacity: 5,
                equipements : null
            }
        ],
        active: false,
        dropdown: false,
        inArray: function(needle, haystack) {
            if (haystack)
            {
                var length = haystack.length;
                for(var i = 0; i < length; i++)
                    if(haystack[i] == needle)
                        return true;
            }
            return false;
        }
    },

    computed: 
    {
        logoGetColor: function ()
        {
            if (this.active)
                return {'background-color': '#fc1cad'}
            else
                return {'background-color': 'black'}
        },
        setHideOrReaveal: function ()
        {
            if (this.dropdown)
            {
                return {
                    'clear': 'both',
                    'display': 'block',
                    'height': '175%',
                    'width': '105%',
                    'position': 'absolute',
                    'border-style': 'solid',
                    'border-color': '#c8ccd0',
                    'border-radius': '5px',
                    'border-width': '1px',
                    'background-color': 'white',
                    'padding-left': '3%',
                    'padding-top': '2%',
                    'margin-top': '2%'}
            }
             else
                 return {'display': 'none'}
        }
    }
});
