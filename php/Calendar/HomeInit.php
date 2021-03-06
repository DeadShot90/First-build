<?php

// DHTMLX Scheduler connector
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/scheduler_connector.php');

// Support for MySQLi
require($_SERVER['DOCUMENT_ROOT'] . '/php/Addon/Dhtmlx/db_mysqli.php');

// DB config file
require($_SERVER['DOCUMENT_ROOT'] . '/php/Partials/DB.php');


// Initialize connection to database
$dbtype = 'MySQLi';
$scheduler = new schedulerConnector($conn, $dbtype);

// Sort result by (X field) and order in (ASC/DESC)
$scheduler->sort('start_date', 'ASC');
// Querry and render calendar
$scheduler->render_table('lessons', 'id', 'id, title, sub, type, start_date, end_date, color, room, ava_max, details, creation_id');


// NOTE: scheduler.getEvents(); to get all loaded events
