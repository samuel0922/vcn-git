import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBts72YjG9d05-05BstoEugiXw4eRt1QnM",
  authDomain: "pjt-todo-backend.firebaseapp.com",
  projectId: "pjt-todo-backend",
  storageBucket: "pjt-todo-backend.firebasestorage.app",
  messagingSenderId: "682015470400",
  appId: "1:682015470400:web:b532f4282dc680e4e580a5",
  databaseURL: "https://pjt-todo-backend-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const todosRef = ref(db, "todos");

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modeLabel = document.getElementById("mode-label");
const list = document.getElementById("todo-list");
const itemTemplate = document.getElementById("todo-item-template");

let todos = [];
let editingId = null;

form.addEventListener("submit", handleSubmit);
cancelBtn.addEventListener("click", cancelEditMode);
subscribeTodos();

function subscribeTodos() {
  return onValue(
    todosRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        todos = [];
        renderTodos();
        return;
      }

      const rawTodos = snapshot.val();
      todos = Object.entries(rawTodos)
        .map(([id, item]) => ({
          id,
          text: item?.text,
          completed: item?.completed,
        }))
        .filter(
          (item) =>
            typeof item.id === "string" &&
            typeof item.text === "string" &&
            typeof item.completed === "boolean"
        );
      renderTodos();
    },
    (error) => {
      todos = [];
      renderTodos();
      showError(
        formatFirebaseError(
          error,
          "할일 목록을 불러오지 못했습니다. Firebase DB 권한을 확인해주세요."
        )
      );
    }
  );
}

function showError(message) {
  window.alert(message);
}

function formatFirebaseError(error, fallbackMessage) {
  if (!error || typeof error !== "object") {
    return fallbackMessage;
  }

  const code = "code" in error ? error.code : null;
  const message = "message" in error ? error.message : null;

  if (typeof code === "string" && typeof message === "string") {
    return `${fallbackMessage}\n(${code}) ${message}`;
  }

  if (typeof code === "string") {
    return `${fallbackMessage}\n(${code})`;
  }

  return fallbackMessage;
}

async function handleSubmit(event) {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  try {
    if (editingId === null) {
      await push(todosRef, {
        text,
        completed: false,
        createdAt: Date.now(),
      });
    } else {
      await update(ref(db, `todos/${editingId}`), { text });
    }

    resetFormState();
  } catch (error) {
    showError(
      formatFirebaseError(
        error,
        "저장 중 오류가 발생했습니다. Firebase 설정을 확인해주세요."
      )
    );
  }
}

function renderTodos() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "todo-item";
    emptyItem.textContent = "할일이 없습니다. 새 할일을 추가해보세요.";
    list.appendChild(emptyItem);
    return;
  }

  todos.forEach((todo) => {
    const node = itemTemplate.content.firstElementChild.cloneNode(true);
    const toggle = node.querySelector(".todo-toggle");
    const text = node.querySelector(".todo-text");
    const editBtn = node.querySelector(".edit-btn");
    const deleteBtn = node.querySelector(".delete-btn");

    text.textContent = todo.text;
    toggle.checked = todo.completed;

    if (todo.completed) {
      node.classList.add("completed");
    }

    toggle.addEventListener("change", () => toggleTodo(todo.id));
    editBtn.addEventListener("click", () => startEditMode(todo.id));
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    list.appendChild(node);
  });
}

async function toggleTodo(id) {
  const target = todos.find((todo) => todo.id === id);
  if (!target) {
    return;
  }

  try {
    await update(ref(db, `todos/${id}`), {
      completed: !target.completed,
    });
  } catch (error) {
    showError(formatFirebaseError(error, "상태 변경 중 오류가 발생했습니다."));
  }
}

function startEditMode(id) {
  const target = todos.find((todo) => todo.id === id);
  if (!target) {
    return;
  }
  editingId = id;
  input.value = target.text;
  submitBtn.textContent = "수정 저장";
  cancelBtn.classList.remove("hidden");
  modeLabel.textContent = "수정 모드";
  input.focus();
}

function cancelEditMode() {
  resetFormState();
}

function resetFormState() {
  editingId = null;
  form.reset();
  submitBtn.textContent = "추가";
  cancelBtn.classList.add("hidden");
  modeLabel.textContent = "추가 모드";
}

async function deleteTodo(id) {
  try {
    await remove(ref(db, `todos/${id}`));

    if (editingId === id) {
      resetFormState();
    }
  } catch (error) {
    showError(formatFirebaseError(error, "삭제 중 오류가 발생했습니다."));
  }
}
