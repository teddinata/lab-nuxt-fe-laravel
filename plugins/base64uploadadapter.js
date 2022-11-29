import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

export default {
    name: 'Base64UploadAdapter',
    afterInit( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            return new Base64UploadAdapter( loader );
        }
    }
}
