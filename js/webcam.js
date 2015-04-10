/**
 * @file
 * Contains javascript for webcam.
 */

(function($) {

  var userstream;
  Drupal.webcam = Drupal.webcam || {};

  Drupal.theme.prototype.showMessage = function(msg, value) {
    var divClass = (value) ? 'status' : 'error';
    var message = '<div class="messages ' + divClass + '">' + Drupal.t(msg);
    message += '</div>';
    return message;
  };
  // Show error message if there was problem while accessing webcam.
  Drupal.webcam.errorCallback = function(e) {
    var error = 'There was a problem while accessing the webcam';
    $(Drupal.theme('showMessage', error, 0)).insertAfter('.video-container .actions').delay(10000).hide('slow');
  };
  // Play video.
  Drupal.webcam.successCallback = function(stream) {
    userstream = stream;
    $('#webcam_video').attr('src', window.URL.createObjectURL(stream));
    $('#webcam_video').get(0).play();
  };
  // Stop video.
  Drupal.webcam.stopCam = function() {
    $('#webcam_video').attr('src', '');
    userstream.stop();
    userstream = null;
  };
  // Initialize navigator.getMedia object depending upon the browser.
  Drupal.webcam.WebRtcInit = function() {
    navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    );
  };

  Drupal.behaviors.takewebcam = {
    attach: function(context, settings) {
      $('#start-camera', context).once('start-cam', function() {
        Drupal.webcam.WebRtcInit();
        // Start the camera.
        $('#start-camera').click(function(e) {
          $('#capture-image').attr('disabled', false);
          $('#start-camera').attr('disabled', true);
          var video_constraints = {
            mandatory: {},
            optional: []
          };
          navigator.getMedia({
            audio: false,
            video: video_constraints
          }, Drupal.webcam.successCallback, Drupal.webcam.errorCallback);
        });
      });

      $('#capture-image', context).once('take-webcam', function() {
        $('#capture-image').click(function(e) {
          $('#capture-image').attr('disabled', true);
          $('#start-camera').attr('disabled', false);
          if ($('#edit-picture-upload').length) {
            $('#edit-picture-upload').val("");
          };
          canvas = $('#canvas').get(0);
          canvas.width = settings.webcam.width;
          canvas.height = settings.webcam.height;
          canvas.getContext('2d').drawImage(webcam_video, 0, 0, settings.webcam.width, settings.webcam.height);
          var dataURL = canvas.toDataURL('image/png');

          $.ajax({
            url: settings.basePath + 'webcam/upload',
            dataType: "json",
            data: {
              'img_data': dataURL,
              'webcam_token': settings.webcam.webcamToken
            },
            type: 'POST',
            /* complete runs on both if error comes or successful */
            complete: function(response, status) {
              Drupal.webcam.stopCam();
            },
            success: function(data) {
              if (data.status) {
                $(Drupal.theme('showMessage', data.status.msg, data.status.value)).insertAfter('.video-container .actions').delay(10000).hide('slow');
                if (data.status.file && $('#webcam-data').length) {
                  $('#webcam-data').val(data.status.file);
                }
              }
            },
          });
        });
      });
    }
  }

})(jQuery);
