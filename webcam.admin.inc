<?php

/**
 * [webcam_settings description]
 * @return [type] [description]
 */
function webcam_settings() {
  $form['webcam'] = array(
    '#type' => 'fieldset',
    '#title' => t('Webcam Configuration'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );
  $form['webcam']['webcam_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Webcam File System Path'),
    '#default_value' => variable_get('webcam_path', 'webcam'),
    '#description' => t('A local file system path where webcam files will be stored. This directory must exist and be writable by Drupal. This directory must be relative to the Drupal installation directory and be accessible over the web.'),
  );
  $webcam_path = 'public://' . variable_get('webcam_path', 'webcam');
  if (!file_prepare_directory($webcam_path, FILE_CREATE_DIRECTORY)) {
    form_set_error('webcam_path', t('The directory %directory does not exist or is not writable.', array('%directory' => $webcam_path)));
  }
  $form['webcam']['webcam_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Image Width'),
    '#default_value' => variable_get('webcam_width', 320),
    '#description' => t('The width of the image preview when webcam is initiated.'),
  );
  $form['webcam']['webcam_height'] = array(
    '#type' => 'textfield',
    '#title' => t('Image Height'),
    '#default_value' => variable_get('webcam_height', 240),
    '#description' => t('The heigth of the image preview when webcam is initiated.'),
  );
  return system_settings_form($form);
}
