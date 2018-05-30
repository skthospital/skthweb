/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	
	config.defaultLanguage = 'en';
	config.language = 'en';
//	config.height = '140px';
	config.autoGrow_onStartup = true;
//	config.autoParagraph = false;				// no wrap document with <p>
//	config.enterMode = CKEDITOR.ENTER_BR;		// no wrap document with <p>
	config.allowedContent = true;				// can add <div> in source mode
//	config.startupMode = 'source';				// default to source mode

	// The toolbar groups arrangement, optimized for two toolbar rows.
//	config.toolbarGroups = [
//		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
//		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
//		{ name: 'links' },
//		{ name: 'insert' },
//		{ name: 'forms' },
//		{ name: 'tools' },
//		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
//		{ name: 'others' },
//		'/',
//		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
//		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
//		{ name: 'styles' },
//		{ name: 'colors' },
//		{ name: 'about' }
//	];
	
	// Toolbar configuration generated automatically by the editor based on config.toolbarGroups.
	config.toolbar = [
	    { name: 'document', groups: [ 'mode', 'document', 'doctools' ],  items: [ 'Source', '-', 'Save', 'Preview', 'Print'] },
	    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	    '/',
	    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
		{ name: 'styles', items: [ 'Format' ] },
		{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
		{ name: 'media', items: [  'PageBreak', 'HorizontalRule', 'Table', 'Image'] },
		{ name: 'tools', items: [ 'Maximize' ] }
		];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
//	config.removeButtons = 'Underline,Subscript,Superscript';

	// See the most common block elements.
//	config.format_tags = 'p;h1;h2;h3;pre';
	config.format_tags = 'p;h3;h4;h5;h6';

	// Make dialogs simpler.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	
	// Extra
	config.extraPlugins = 'youtube';
};
