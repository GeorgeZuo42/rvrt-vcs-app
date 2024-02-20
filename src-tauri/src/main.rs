// src-tauri/src/main.rs
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{generate_handler, Builder, RunEvent};

fn main() {
  tauri::Builder::default()
      .invoke_handler(generate_handler![list_projects, add_project])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

#[tauri::command]
fn list_projects() -> Vec<Project> {
  // 实现列出项目的逻辑
  vec![] // 示例: 返回一个空列表
}

#[tauri::command]
fn add_project(path: String) {
    // 在这里实现添加项目到列表的逻辑
    // 例如，你可以将路径添加到某个文件、数据库或内存中的列表
}

#[derive(serde::Serialize)]
struct Project {
  name: String,
  vcs: String,
}
