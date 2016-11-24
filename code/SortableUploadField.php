<?php

class SortableUploadField extends UploadField {
	private $sortField = 'Sort';

	static $allowed_actions = array( 'savesort' );

	/*
		include js
		have property and setter method for sort field
			default to item's default sort

		function to pick "title" in template (default to file name + extension)
			ovewrite the template
				need to overwrite the item template too?
	*/

	public function __construct($name, $title = null, SS_List $items = null) {
		// add a class for the javascript
		$this->addExtraClass('ss-sortableuploadfield');

		parent::__construct($name, $title, $items);
	}

	function setSortField($field) {
		$this->sortField = $field;
	}

	function getSortField() {
		return $this->sortField;
	}

	function getSortURL() {
		return $this->Link('savesort');
	}

	public function Field($properties = array()) {
		// add the javascript
		$this->setConfig('sorturl', $this->Link('savesort'));
		$output = parent::Field($properties);

		Requirements::javascript(SORTABLEUPLOADFIELD_DIR . '/javascript/SortableUploadField.js');
		Requirements::css(SORTABLEUPLOADFIELD_DIR . '/css/SortableUploadField.css');

		return $output;
	}



	function savesort(SS_HTTPRequest $request) {

		if($this->isDisabled() || $this->isReadonly()) return $this->httpError(403);

		$token = $this->getForm()->getSecurityToken();
		if(!$token->checkRequest($request)) return $this->httpError(400);


		$postVars = $request->postVars('items');
		$itemData = $postVars['items'];


		$name = $this->getName();
		$record = $this->getRecord();
		$items = array();
		if ($record && $record->exists()) {
			if ($record->has_many($name) || $record->many_many($name)) {
				// Ensure relationship is cast to an array, as we can't alter the items of a DataList/RelationList (see below)
				$items = $record->{$name}()->toArray();
			} elseif($record->has_one($name)) {
				$item = $record->{$name}();
				if ($item && $item->exists())
					$items = array($item);
			}
		}

		$itemsById = array();
		foreach ($items as $item) {
			$itemsById[$item->ID] = $item;
		}

		$relationClass = $this->getRelationAutosetClass();
		$sortField = $this->getSortField();
		foreach ($itemData as $key => $id) {
			if (isset($itemsById[$id])) {
				$item = $itemsById[$id];
				if ($item->{$sortField} != $key) {
					$item->{$sortField} = $key;
					$item->write();
				}

			}
		}
	}


	/**
	 * @param File
	 */
	protected function attachFile($file) {
		$record = $this->getRecord();
		$name = $this->getName();
		if ($record && $record->exists()) {
			if ($record->has_many($name) || $record->many_many($name)) {
				if(!$record->isInDB()) {
					$record->write();
				}

				$sortField = $this->getSortField();

				$sort = $record->{$name}()->max($sortField);

				$file->$sortField = (is_numeric($sort)) ? $sort + 1 : 1;

				$record->{$name}()->add($file);

			} elseif($record->has_one($name)) {

				$record->{$name . 'ID'} = $file->ID;
				$record->write();

			}
		}
	}

}
