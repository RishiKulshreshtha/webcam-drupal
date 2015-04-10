<?php
/**
 * @file
 * Template to take webcam.
 *
 * Available variables:
 * - $video_width: The width of the video element.
 * - $video_height: The height of the video element.
 */
?>
<div class="webcam-container">
  <div class="webcam">
    <canvas id="canvas"></canvas>
    <video id="webcam_video" width=<?php print $video_width;?> height=<?php print $video_height;?>></video>
  </div>
  <div class="actions">
    <input type="button" id="start-camera" class="form-submit" value="Start Camera">
    <input type="button" id="capture-image" class="form-submit" disabled="true" value="Capture Image">
  </div>
</div>
