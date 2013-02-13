SilverStripe Minify CSS Module
=============

This module creates a subclass of UploadField that allows for sorting the managed files.

Also changes the upload interface, heavily inspired by the more complete Gallery module (https://github.com/frankmullenger/silverstripe-gallery).

Still in development.


Maintainer
-------------

Nathan Cox (<nathan@flyingmonkey.co.nz>)

Requirements
---------------

SilverStripe 3.0+


Installation Instructions
-------------------------

1. Place the files in a directory called "sortableuploadfield" in the root of your SilverStripe installation
2. Visit yoursite.com/dev/build


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

You can change the name of the sort attribute with $sortableField->setSortField('SortOrderOrWhatever');


Known Issues
------------

[Issue Tracker](https://github.com/nathancox/silverstripe-sortableuploadfield/issues)
