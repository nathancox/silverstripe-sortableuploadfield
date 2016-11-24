(function($) {
	$.entwine('sortableupload', function($) {

		$('div.ss-uploadfield.ss-sortableuploadfield').entwine({

			List: null,

			onmatch: function() {
				this._super();

				var self = this;
				var list = $('.ss-uploadfield-files', this);

				this.setList(list);


				this.bind('fileuploadadd', function() {
				//	self.storeSize();
				});

				this.bind('fileuploaddestroy', function() {
				//	self.storeSize();
				});


				self.data('SecurityID', self.closest('form').find(':input[name=SecurityID]').val());

				var uploader = this.data('fileupload');

				list.sortableupload({
					axis: 'y',
					placeholder: 'ui-state-highlight',
					forcePlaceholderSize: true,
					cursor: 'move',
					start: function(e, ui ){
					  ui.placeholder.height(ui.helper.outerHeight() - 2);
					},
					update: function(e, ui) {
						self.saveSortOrder(ui.item);
						self.storeSize('auto');
					}
				});

			},
			attachFiles: function(ids) {
				this._super(ids);
				this.saveSortOrder();
			},

			saveSortOrder: function(editedItem) {

				var children = $(this).getList().children();
				var items = {};
				var i;
				for (i = 0; i < children.length; i++) {
					items[i] = $(children[i]).data('fileid');
				}

				if (editedItem) {
					editedItem.addClass('thinking');
				}

				var config = this.entwine('.ss').getConfig();
				var securityID = this.data('SecurityID');

				$.post(
					config.sorturl,
					{
						'items': items,
						'SecurityID': securityID
					},
					function(data, status, xhr) {
						if (editedItem) {
							editedItem.removeClass('thinking');
						}
					}
				);

			},

			storeSize: function(setHeight) {
				var list = this.getList();
				if (!setHeight) {
					list.css('min-height', 'auto');
					var setHeight = list.height();
				}

				list.css('min-height', setHeight);
			}

		});

		// add drag handles
		$('div.ss-uploadfield.ss-sortableuploadfield .template-download').entwine({
			onmatch: function() {
				this.append("<span class='sortable-uploadfield-drag-handle'></span><span class='sortable-uploadfield-drag-handle'></span>");
			}
		});

	});




	$.widget("fm.sortableupload", $.ui.sortable, {
		_mouseStart: function(event, overrideHandle, noActivation) {
			$(this.element).closest('.ss-sortableuploadfield').entwine('sortableupload').storeSize();
			$.ui.sortable.prototype._mouseStart.call(this, event, overrideHandle, noActivation);
			return true;
		}
	});


}(jQuery));