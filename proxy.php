<?php
$params = str_replace(' ', '%20', $_GET['params']);
$url = "http://vm-psi.csi.it:8080/fed-homer/".$_GET['path']."?".$params;

//echo $url;die;
$result = file_get_contents($url);
if (strpos($url,'wt=xml') !== false) {
	header('Content-type: application/xml');
}
else{
	header('Content-type: application/json');
}
echo $result;
?>