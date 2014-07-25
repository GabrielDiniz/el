<?php

header('Access-Control-Allow-Origin: *');

$db = mysql_connect('localhost','root','ak47') or die("Database error");
mysql_select_db('cep', $db);
$result = mysql_query("set names 'utf8'");
$sql="SELECT c.id, c.nome, c.uf, b.id, b.nome, e.id, e.logracompl
FROM  `cidades` c
INNER JOIN bairros b ON b.cidade = c.id
INNER JOIN enderecos e ON e.bairro_id = b.id
WHERE c.id
IN ( 2885,2704 ) 
ORDER BY c.nome, b.nome, e.nomeslog";
$result = mysql_query($sql)or die(mysql_error());
$array=array();
while($row = mysql_fetch_row($result)){
	$array[$row[0]]['cidade']=$row[1];
	$array[$row[0]]['slug']=str_replace(array(' ','.',')','('),array('-','','-'),$row[1]);
	$array[$row[0]]['uf']=$row[2];
	$array[$row[0]]['bairros'][$row[3]]['bairro']=$row[4];
	$array[$row[0]]['bairros'][$row[3]]['slug']=str_replace(array(' ','.',')','('),array('-','','-'),$row[4]);
	$array[$row[0]]['bairros'][$row[3]]['ruas'][$row[5]]=$row[6];
}
echo json_encode($array);