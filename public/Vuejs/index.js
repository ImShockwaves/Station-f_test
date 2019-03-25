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
                for (var i = 0; i < length; i++)
                    if( haystack[i] == needle)
                        return true;
            }
            return false;
        },
        stuffRequire: [],
        capacityRequire: 0,
        checkRoom: function(stuff, capacity) {
            var ret = true;
            if (capacity < this.capacityRequire && this.capacityRequire != 0)
                ret = false;
            if (this.stuffRequire.length > 0)
            {
                if (stuff == null)
                    return false;
                var length = this.stuffRequire.length;
                for (var i = 0; i < length; i++)
                    if (!this.inArray(this.stuffRequire[i], stuff))
                        return false;
            }
            return ret;
        },
        selectedRoom: null,
        date: null,
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
        },
        formIsValid: function()
        {
            return this.selectedRoom && this.date;
        },
        submitButtonColor: function()
        {
            if (this.formIsValid)
              return '#4c7ef3';
            else
              return 'gray';
        }   
    },

    methods:
    {
        selected: function (roomName) {
            if (roomName == this.selectedRoom)
                return {
                    'border-width': '4px',
                    'border-color': '#4c7ef3'}
        }
    }
});
