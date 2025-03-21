<?php
/*
 * @Author: kemomi zjm18702566651@163.com
 * @Date: 2025-03-21 12:26:05
 * @LastEditors: kemomi zjm18702566651@163.com
 * @LastEditTime: 2025-03-21 12:32:54
 * @FilePath: \SakuraTime\api\config.php
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
header('Content-Type: application/json');
require 'config.php';

$flowerType = $_GET['type'] ?? 'sakura';
$dataFile = "data/{$flowerType}.json";

if (file_exists($dataFile)) {
    readfile($dataFile);
} else {
    http_response_code(404);
    echo json_encode(['error' => '未找到该花卉数据']);
}
?>