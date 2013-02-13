(function($) {
	$.entwine('ss', function($) {
	
		$('.ss-sortableuploadfield .ss-uploadfield-files').entwine({
			onmatch: function() {

				var self = this;
				var $field = self.closest('.ss-upload');

console.log($field);
console.log($field.getConfig());
console.log($field.entwine('ss').getConfig());

				var securityID = self.closest('form').find(':input[name=SecurityID]').val();

				var sortURL = self.data('sorturl');



				this.sortable({
					axis: 'y',
				//	placeholder: 'ui-state-highlight',
					forcePlaceholderSize: true,
					cursor: 'move',
					create:function(){
					  
					},

					start: function(e, ui){
						
					//	ui.placeholder.height(ui.item.outerHeight() - 2);
					//	console.log("start = " + self.height());
   				 },
					stop: function(e, ui){
					//	self.css('height', 'auto');
						
   				},
					update: function(e, ui) {
						
						var children = $(this).children();
						var items = {};
						var i;
						for (i = 0; i < children.length; i++) {
							items[i] = $(children[i]).data('fileid');
						}
						ui.item.addClass('thinking');
						$.post(
							sortURL,
							{ 
								'items': items,
								'SecurityID': securityID
							},
							function(data, status, xhr) {
								ui.item.removeClass('thinking');
							}
						);
						
					}
				});

				self.children('li').mousedown(function() {
					console.log('asdf');
					self.storeSize();
					return true;
				});

				this._super();



			},

			storeSize: function() {
				this.css('min-height', 'auto');
				this.css('min-height', this.height());
			}
			
		});


		$('div.sortableupload .ss-uploadfield-item-remove:not(.ui-state-disabled), .ss-uploadfield-item-delete:not(.ui-state-disabled)').entwine({
			onclick: function(e) {
				console.log(this.closest('.ss-uploadfield-files'));
				this.closest('.ss-uploadfield-files').entwine('sortableupload').storeSize();
				this._super();
			}
		});


	});
	
}(jQuery));