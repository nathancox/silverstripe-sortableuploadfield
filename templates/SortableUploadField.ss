<% if isDisabled || isReadonly %>
	<% if isSaveable %>
	<% else %>
		<div class="ss-uploadfield-item">
			<em><% _t('FileIFrameField.ATTACHONCESAVED2', 'Files can be attached once you have saved the record for the first time.') %></em>
		</div>
	<% end_if %>
<% else %>
	<div class="ss-uploadfield-item ss-uploadfield-addfile" >
 
		
		<div class="ss-uploadfield-item-preview ss-uploadfield-dropzone">
			<div>
				<% _t('AssetUploadField.DROPAREA', 'Drop Area') %>
				<span><% _t('AssetUploadField.DRAGFILESHERE', 'Drag files here') %></span>
			</div>
		</div>
		
		
		<div class="ss-uploadfield-item-info">
			
			<label class="ss-uploadfield-item-name"><b><% _t('UploadField.ATTACHFILES', 'Attach files') %></b>
				<% if $canPreviewFolder %>
					<small>(<%t UploadField.UPLOADSINTO 'saves into /{path}' path=$FolderName %>)</small>
				<% end_if %>

			</label>
			
			<% if $canUpload %>
				<label class="ss-uploadfield-fromcomputer ss-ui-button ui-corner-all" title="<% _t('UploadField.FROMCOMPUTERINFO', 'Upload from your computer') %>" data-icon="drive-upload">
					<% _t('UploadField.FROMCOMPUTER', 'From your computer') %>
					<input id="$id" name="{$Name}[Uploads][]" class="$extraClass ss-uploadfield-fromcomputer-fileinput" data-config="$configString" type="file"<% if $multiple %> multiple="multiple"<% end_if %> />
				</label>
			<% else %>
				<input id="$id" name="{$Name}[Uploads][]" class="$extraClass ss-uploadfield-fromcomputer-fileinput" data-config="$configString" type="hidden" />
			<% end_if %>

			<% if $canAttachExisting %>
				<button class="ss-uploadfield-fromfiles ss-ui-button ui-corner-all" title="<% _t('UploadField.FROMCOMPUTERINFO', 'Select from files') %>" data-icon="network-cloud"><% _t('UploadField.FROMFILES', 'From files') %></button>
			<% end_if %>
			<% if $canUpload %>
				<% if not $autoUpload %>
					<button class="ss-uploadfield-startall ss-ui-button ui-corner-all" data-icon="navigation"><% _t('UploadField.STARTALL', 'Start all') %></button>
				<% end_if %>
			<% end_if %>
			<div class="clear"><!-- --></div>
		</div>
		<div class="clear"><!-- --></div>
	</div>
<% end_if %>
 
 
 
 
<ul class="ss-uploadfield-files files">
	<% if $CustomisedItems %>
		<% loop $CustomisedItems %>
			<li class="ss-uploadfield-item template-download" data-fileid="$ID">
				<div class="ss-uploadfield-item-preview preview"><span>
					<img alt="$hasRelation" src="$UploadFieldThumbnailURL" />
				</span></div>
				<div class="ss-uploadfield-item-info">
				<input type='hidden' value='$ID' name='{$Top.Name}[Files][]' />
					<label class="ss-uploadfield-item-name">
						<b><% if FieldTitle %>$FieldTitle<% else %>{$Title}.{$Extension}<% end_if %></b>
						<span>$Size</span>
						<div class="clear"><!-- --></div>
					</label>
					<div class="ss-uploadfield-item-actions">
						<% if Top.isDisabled || Top.isReadonly %>
						<% else %>
							$UploadFieldFileButtons
						<% end_if %>
					</div>
				</div>
				<div class="ss-uploadfield-item-editform">
					<iframe frameborder="0" data-src="$UploadFieldEditLink" src="$UploadFieldEditLink"></iframe>
				</div>
			</li>
		<% end_loop %>
	<% end_if %>
</ul>