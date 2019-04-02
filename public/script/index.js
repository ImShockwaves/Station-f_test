const logo = new Vue({
	el: '#app',
	data:
	{
		rooms: [],
		active: false,
		dropdown: false,
		stuffRequire: [],
		capacityRequire: 0,
		confirmRoom: false,
		selectedRoom: null,
		confirmation: false,
		date: null,
		reservation: null
		
	},

	computed: 
	{
		logoGetColor: function ()
		{
			if (this.active && !this.confirmRoom)
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
					'height': '175%',
					'width': '105%',
					'position': 'absolute',
					'display': 'inline-block',
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
			if (!this.confirmRoom && this.selectedRoom && this.date == this.selectedRoom.date && this.selectedRoom.name && this.checkRoom(this.selectedRoom.equipements, this.selectedRoom.capacity))
				return true;
			else
				return false;
		},
		submitButtonColor: function()
		{
			if (this.formIsValid)
			  return '#4c7ef3';
			else
			  return 'gray';
		},   
		submitted: function ()
		{
			if (this.confirmRoom && !this.confirmation)
			{
				return {
					'position': 'absolute',
					'display': 'flex',
					'flex-direction': 'column',
					'justify-content': 'space-between',
					'z-index': '1',
					'width': '50vw',
					'height': '50vw',
					'max-width': '800px',
					'max-height': '800px',
					'top': '25%',
					'right': '35%',
					'padding': '2vw',
					'background-color': 'white',
					'border-style': 'solid',
					'border-width': '4px',
					'border-color': 'rgba(76, 126, 243, .5)',
					'border-radius': '5px' }
			}
			else
				return { 'display': 'none'}
		}
	},

	methods:
	{
		selected: function (roomName) {
			if (this.selectedRoom && this.date && roomName == this.selectedRoom.name && this.date == this.selectedRoom.date && this.checkRoom(this.selectedRoom.equipements, this.selectedRoom.capacity))
				return {
					'border-width': '4px',
					'border-color': '#4c7ef3'}
		},
		inArray: function(needle, haystack) {
			if (haystack)
			{
				var length = haystack.length;
				for (var i = 0; i < length; i++)
					for (var name in haystack[i])
						if (haystack[i][name] === needle)
							return true;
			}
			return false;
		},
		checkRoom: function(stuff, capacity, name) {
			var ret = true;
			if (this.reservation)
				for (var i = 0; i < this.reservation.length; i++)
					if (this.reservation[i].name == name && this.reservation[i].date == this.date)
						return false;                   
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
		setSelect: function (room)
		{
			if (this.date && !this.confirmRoom)
			{
				this.selectedRoom = room;
				this.selectedRoom.date = this.date;
			}
		},
		setConfirmation: function ()
		{
			this.confirmation = false;
		},
		triggerConfirmation: function()
		{
			this.confirmation = true;
			this.confirmRoom = false;
			var data = {
				name: this.selectedRoom.name,
				date: this.selectedRoom.date };
			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				url: 'http://35.180.192.224:8333/endpoint',						
				success: function(data) {
					console.log('data successfully send');
				}
			});
			this.reservation.push(data);
			this.selectedRoom = null;
			setTimeout(this.setConfirmation, 1000);
		}
	},
	mounted: function ()
	{
		var self = this;
		$.ajax({
			url: '../api/rooms.json',
			method: 'GET',
			success: function (data) {
				self.rooms = data.rooms;
				for (var id = 0; id < self.rooms.length; id++)
					self.rooms[id].id = id; 
			},
			error: function (error) {
				console.log(error);
			}
		});
		$.ajax({
			url: '../api/reservation.json',
			method: 'GET',
			success: function (data) {
				self.reservation = data.reservation;
			},
			error: function (error) {
				console.log(error);
			}
		});
	}
});
