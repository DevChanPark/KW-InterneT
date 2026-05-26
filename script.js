(function () {
  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };
  var root = document.documentElement;
  var storage = {
    get: function (key, fallback) {
      try {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        return false;
      }
      return true;
    },
    remove: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        return false;
      }
      return true;
    }
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (match) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[match];
    });
  }

  function dateInputValue(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function readableDate(dateString) {
    var date = new Date(dateString + "T00:00:00");
    return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
  }

  function daysBetween(dateString) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = new Date(dateString + "T00:00:00");
    return Math.round((target.getTime() - today.getTime()) / 86400000);
  }

  function ddayText(diff) {
    if (diff === 0) {
      return "D-Day";
    }
    if (diff > 0) {
      return "D-" + diff;
    }
    return "D+" + Math.abs(diff);
  }

  function initCommon() {
    var year = $("#year");
    var now = new Date();
    if (year) {
      year.textContent = now.getFullYear();
    }

    var todayLabel = $("#todayLabel");
    if (todayLabel) {
      todayLabel.textContent = readableDate(dateInputValue(now));
    }

    var current = location.pathname.split("/").pop() || "index.html";
    $$(".site-nav a").forEach(function (link) {
      if (link.getAttribute("href") === current) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });

    var savedTheme = storage.get("yechan-theme", null);
    if (savedTheme) {
      root.dataset.theme = savedTheme;
    }
    updateThemeIcon();
    $("[data-theme-toggle]") && $("[data-theme-toggle]").addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      storage.set("yechan-theme", nextTheme);
      updateThemeIcon();
    });

    var progress = $(".scroll-progress span");
    var backTop = $("[data-back-top]");
    var updateScroll = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progress) {
        progress.style.width = percent + "%";
      }
      if (backTop) {
        backTop.classList.toggle("is-visible", window.scrollY > 420);
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    if (backTop) {
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    $$(".skill-row").forEach(function (row) {
      row.style.setProperty("--level", (row.dataset.level || 0) + "%");
    });

    initReveal();
    initTyping();
  }

  function updateThemeIcon() {
    var icon = $("[data-theme-icon]");
    if (!icon) {
      return;
    }
    icon.textContent = root.dataset.theme === "dark" ? "☀" : "☾";
  }

  function initReveal() {
    var targets = $$(".reveal");
    if (!targets.length) {
      return;
    }
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initTyping() {
    var target = $("[data-typing]");
    if (!target) {
      return;
    }
    var phrases = (target.dataset.phrases || target.textContent).split("|");
    var phraseIndex = 0;
    var letterIndex = 0;
    var deleting = false;

    function tick() {
      var phrase = phrases[phraseIndex];
      target.textContent = phrase.slice(0, letterIndex);

      if (!deleting && letterIndex < phrase.length) {
        letterIndex += 1;
        setTimeout(tick, 80);
        return;
      }
      if (!deleting && letterIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
      if (deleting && letterIndex > 0) {
        letterIndex -= 1;
        setTimeout(tick, 42);
        return;
      }
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, 220);
    }
    tick();
  }

  function initProjectFilter() {
    var buttons = $$(".filter-btn");
    var cards = $$("[data-project-card]");
    var empty = $("[data-empty-projects]");
    if (!buttons.length || !cards.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (item) {
          item.classList.remove("is-active");
        });
        button.classList.add("is-active");
        var filter = button.dataset.filter;
        var visibleCount = 0;
        cards.forEach(function (card) {
          var tags = (card.dataset.tags || "").split(" ");
          var visible = filter === "all" || tags.indexOf(filter) !== -1;
          card.hidden = !visible;
          if (visible) {
            visibleCount += 1;
          }
        });
        if (empty) {
          empty.hidden = visibleCount > 0;
        }
      });
    });
  }

  function initDday() {
    var form = $("#ddayForm");
    if (!form) {
      return;
    }
    var nameInput = $("#ddayName");
    var dateInput = $("#ddayDate");
    var result = $("#ddayResult");
    var list = $("#ddayList");
    var clear = $("#ddayClear");
    var key = "yechan-dday-events";
    var events = storage.get(key, []);
    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    dateInput.value = dateInputValue(defaultDate);

    function saveAndRender() {
      storage.set(key, events);
      render();
    }

    function render() {
      if (!events.length) {
        list.innerHTML = "<li><div><strong>저장된 일정이 없습니다</strong><small>새 일정을 추가해보세요.</small></div></li>";
        return;
      }
      events.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      list.innerHTML = events.map(function (event) {
        var diff = daysBetween(event.date);
        return [
          '<li data-event-id="' + escapeHTML(event.id) + '">',
          "<div>",
          "<strong>" + escapeHTML(event.name) + " · " + ddayText(diff) + "</strong>",
          "<small>" + readableDate(event.date) + "</small>",
          "</div>",
          '<button class="text-button" type="button" data-remove-event>삭제</button>',
          "</li>"
        ].join("");
      }).join("");
    }

    $$(".quick-row button", form).forEach(function (button) {
      button.addEventListener("click", function () {
        var target = new Date();
        target.setDate(target.getDate() + Number(button.dataset.dateOffset || 0));
        dateInput.value = dateInputValue(target);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = nameInput.value.trim();
      var date = dateInput.value;
      if (!name || !date) {
        result.textContent = "일정 이름과 날짜를 모두 입력해주세요.";
        return;
      }
      var diff = daysBetween(date);
      events.push({
        id: Date.now().toString(36),
        name: name,
        date: date
      });
      result.textContent = name + "은 " + readableDate(date) + " 기준 " + ddayText(diff) + "입니다.";
      nameInput.value = "";
      saveAndRender();
    });

    list.addEventListener("click", function (event) {
      if (!event.target.matches("[data-remove-event]")) {
        return;
      }
      var item = event.target.closest("[data-event-id]");
      events = events.filter(function (saved) {
        return saved.id !== item.dataset.eventId;
      });
      saveAndRender();
    });

    clear.addEventListener("click", function () {
      events = [];
      saveAndRender();
      result.textContent = "저장된 일정을 모두 삭제했습니다.";
    });

    render();
  }

  function initRandomPicker() {
    var form = $("#randomForm");
    if (!form) {
      return;
    }
    var textarea = $("#randomItems");
    var result = $("#randomResult");
    var display = $(".picker-display");
    var sample = $("#randomSample");
    var clear = $("#randomClear");
    var history = $("#randomHistory");
    var inputKey = "yechan-random-input";
    var historyKey = "yechan-random-history";
    var sampleText = "짜장면, 짬뽕, 탕수육, 수박, 딸기, 사과, 마라탕";
    var savedHistory = storage.get(historyKey, []);
    textarea.value = storage.get(inputKey, sampleText);

    function parseItems() {
      return textarea.value.split(/[\n,]+/)
        .map(function (item) {
          return item.trim();
        })
        .filter(Boolean);
    }

    function renderHistory() {
      if (!savedHistory.length) {
        history.innerHTML = "<li><div><strong>기록이 없습니다</strong><small>뽑기 버튼을 눌러보세요.</small></div></li>";
        return;
      }
      history.innerHTML = savedHistory.slice(0, 6).map(function (item) {
        return "<li><div><strong>" + escapeHTML(item.choice) + "</strong><small>" + escapeHTML(item.time) + "</small></div></li>";
      }).join("");
    }

    textarea.addEventListener("input", function () {
      storage.set(inputKey, textarea.value);
    });

    sample.addEventListener("click", function () {
      textarea.value = sampleText;
      storage.set(inputKey, sampleText);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var items = parseItems();
      if (!items.length) {
        result.textContent = "항목을 먼저 입력해주세요.";
        return;
      }
      var index = Math.floor(Math.random() * items.length);
      var choice = items[index];
      result.textContent = choice;
      display.classList.remove("is-rolling");
      window.requestAnimationFrame(function () {
        display.classList.add("is-rolling");
      });
      savedHistory.unshift({
        choice: choice,
        time: new Date().toLocaleString("ko-KR")
      });
      savedHistory = savedHistory.slice(0, 12);
      storage.set(historyKey, savedHistory);
      renderHistory();
    });

    clear.addEventListener("click", function () {
      savedHistory = [];
      storage.set(historyKey, savedHistory);
      result.textContent = "기록을 삭제했습니다";
      renderHistory();
    });

    renderHistory();
  }

  function initContact() {
    var form = $("#contactForm");
    if (!form) {
      return;
    }
    var name = $("#contactName");
    var email = $("#contactEmail");
    var message = $("#contactMessage");
    var count = $("[data-message-count]");
    var result = $("[data-contact-result]");
    var clearDraft = $("[data-clear-draft]");
    var copyEmail = $("[data-copy-email]");
    var copyStatus = $("[data-copy-status]");
    var key = "yechan-contact-draft";
    var draft = storage.get(key, {});

    name.value = draft.name || "";
    email.value = draft.email || "";
    message.value = draft.message || "";

    function updateCount() {
      count.textContent = message.value.length + " / 300";
    }

    function saveDraft() {
      storage.set(key, {
        name: name.value,
        email: email.value,
        message: message.value
      });
      updateCount();
    }

    [name, email, message].forEach(function (field) {
      field.addEventListener("input", saveDraft);
    });
    updateCount();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var errors = [];
      if (!name.value.trim()) {
        errors.push("이름");
      }
      if (!message.value.trim()) {
        errors.push("메시지");
      }
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        result.textContent = "이메일 형식을 확인해주세요.";
        return;
      }
      if (errors.length) {
        result.textContent = errors.join(", ") + " 항목을 입력해주세요.";
        return;
      }
      result.textContent = "메시지 초안이 준비되었습니다. 입력 내용은 이 브라우저에 저장됩니다.";
    });

    clearDraft.addEventListener("click", function () {
      name.value = "";
      email.value = "";
      message.value = "";
      storage.remove(key);
      updateCount();
      result.textContent = "초안을 지웠습니다.";
    });

    copyEmail.addEventListener("click", function () {
      var address = copyEmail.dataset.email;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(function () {
          copyStatus.textContent = "연락 링크를 복사했습니다.";
        }).catch(function () {
          copyStatus.textContent = address;
        });
      } else {
        copyStatus.textContent = address;
      }
    });
  }

  initCommon();
  initProjectFilter();
  initDday();
  initRandomPicker();
  initContact();
})();
