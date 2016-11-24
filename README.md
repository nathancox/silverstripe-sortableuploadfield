SilverStripe Sortable Upload Field Module
=============

This module creates a subclass of UploadField that allows for sorting the managed files.

Also changes the upload interface which is heavily inspired by the more complete but use-specific Gallery module (https://github.com/frankmullenger/silverstripe-gallery).

Still in development.


Maintainer
-------------

Nathan Cox (<nathan@flyingmonkey.co.nz>)

Requirements
---------------

SilverStripe 3.0+


Installation Instructions
-------------------------

Via composer:

```
composer require nathancox/sortableuploadfield
```

Or manually download the module and place it in a folder in your site root.

Visit yoursite.com/dev/build


Usage
-----

By default the field will use the File's Sort attribute for sorting.  You'll need to make a subclass of File or Image to give it a sort field and $default_sort:

```php

class SlideshowImage extends Image {
	static $default_sort = 'Sort ASC';

	static $db = array(
		'Sort' => 'Int'
	);
	static $has_one = array(
		'Page' => 'Page'
	);
}
```

And in the page:

```php
	...

	private static $has_many = array(
		'Slides' => 'SlideshowImage'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->addFieldToTab('Root.Slides', $field = SortableUploadField::create('Slides', 'Slides'));

		return $fields;
	}

	...

```

This will produce

![example sortableuploadfield](http://static.flyingmonkey.co.nz/github/silverstripe-sortableuploadfield/sortableuploadfield-1.png)


You can change the name of the sort attribute with `$sortableField->setSortField('SortOrderOrWhatever');`


Known Issues
------------

[Issue Tracker](https://github.com/nathancox/silverstripe-sortableuploadfield/issues)
