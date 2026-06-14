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

  var practicePages = [
    { id: "dday", href: "dday.html", title: "D-Day Keeper", detail: "Date 객체로 날짜 차이 계산" },
    { id: "random", href: "random.html", title: "Random Picker", detail: "String, Array, Math 객체 활용" },
    { id: "dom-style", href: "dom_style.html", title: "DOM 스타일 변환기", detail: "DOM style 프로퍼티 변경" },
    { id: "dom-list", href: "dom_list.html", title: "댓글 추가/삭제", detail: "createElement와 removeChild" },
    { id: "event-order", href: "event_order.html", title: "스마트 피자 주문서", detail: "폼 이벤트와 총액 계산" },
    { id: "event-car", href: "event_car.html", title: "키보드 자동차", detail: "키보드 이벤트와 경계 체크" }
  ];

  var pageTitles = {
    "index.html": "Home",
    "about.html": "About",
    "portfolio.html": "Portfolio",
    "search.html": "Search",
    "dashboard.html": "Dashboard",
    "presentation.html": "Pitch Mode",
    "contact.html": "Contact",
    "404.html": "404",
    "dday.html": "D-Day Keeper",
    "random.html": "Random Picker",
    "dom_style.html": "DOM 스타일 변환기",
    "dom_list.html": "댓글 추가/삭제",
    "event_order.html": "스마트 피자 주문서",
    "event_car.html": "키보드 자동차"
  };

  var sitePages = [
    {
      href: "index.html",
      title: "Home",
      category: "소개",
      description: "박예찬 포트폴리오의 첫 화면과 주요 기능 요약입니다.",
      keywords: "홈 소개 박예찬 광운대학교 포트폴리오 메인"
    },
    {
      href: "portfolio.html",
      title: "Portfolio",
      category: "프로젝트",
      description: "전체 실습 카드와 필터 기능을 확인합니다.",
      keywords: "포트폴리오 프로젝트 필터 실습 모음"
    },
    {
      href: "search.html",
      title: "Site Search",
      category: "추가 기능",
      description: "키워드로 실습과 기능 페이지를 바로 찾습니다.",
      keywords: "검색 search 키워드 찾기 추가 기능"
    },
    {
      href: "dashboard.html",
      title: "Final Dashboard",
      category: "추가 기능",
      description: "완료율, 즐겨찾기, 최근 방문, 체크리스트, 메모, 퀴즈를 저장합니다.",
      keywords: "대시보드 dashboard 완료율 즐겨찾기 방문 기록 체크리스트 메모 퀴즈 저장 localStorage"
    },
    {
      href: "presentation.html",
      title: "Pitch Mode",
      category: "발표",
      description: "기말 프로젝트 발표용 슬라이드 모드입니다.",
      keywords: "발표 슬라이드 pitch presentation 기말 프로젝트"
    },
    {
      href: "dday.html",
      title: "D-Day Keeper",
      category: "실습 1",
      description: "Date 객체로 목표 날짜까지 남은 일수를 계산하고 저장합니다.",
      keywords: "D-Day 날짜 Date 계산 일정 저장"
    },
    {
      href: "random.html",
      title: "Random Picker",
      category: "실습 2",
      description: "String, Array, Math 객체를 사용해 랜덤 항목을 뽑습니다.",
      keywords: "랜덤 random String Array Math 뽑기 기록"
    },
    {
      href: "dom_style.html",
      title: "DOM 스타일 변환기",
      category: "실습 3",
      description: "DOM 객체의 style 프로퍼티로 문장 디자인을 바꿉니다.",
      keywords: "DOM style 스타일 글자색 크기 배경 숨기기"
    },
    {
      href: "dom_list.html",
      title: "댓글 추가/삭제",
      category: "실습 4",
      description: "createElement, appendChild, removeChild로 댓글 목록을 제어합니다.",
      keywords: "DOM 댓글 createElement appendChild removeChild 추가 삭제"
    },
    {
      href: "event_order.html",
      title: "스마트 피자 주문서",
      category: "실습 5",
      description: "폼 이벤트로 피자 주문 금액과 영수증을 계산합니다.",
      keywords: "이벤트 event 폼 피자 주문 총액 영수증 onchange submit"
    },
    {
      href: "event_car.html",
      title: "키보드 자동차",
      category: "실습 6",
      description: "keydown 이벤트와 방향키로 자동차를 움직입니다.",
      keywords: "키보드 자동차 keydown 방향키 이벤트 경계 속도"
    },
    {
      href: "contact.html",
      title: "Contact Draft",
      category: "연락",
      description: "폼 검증, 글자 수 표시, 초안 저장을 확인합니다.",
      keywords: "연락 contact form 폼 검증 초안 저장 이메일"
    },
    {
      href: "404.html",
      title: "404 안내 페이지",
      category: "완성도",
      description: "없는 주소로 접근했을 때 주요 페이지로 안내합니다.",
      keywords: "404 오류 페이지 안내 GitHub Pages"
    }
  ];

  function formatTimeAgo(isoString) {
    if (!isoString) {
      return "방문 기록 없음";
    }
    var diff = Date.now() - new Date(isoString).getTime();
    var minute = 60000;
    var hour = minute * 60;
    var day = hour * 24;
    if (diff < minute) {
      return "방금 전";
    }
    if (diff < hour) {
      return Math.floor(diff / minute) + "분 전";
    }
    if (diff < day) {
      return Math.floor(diff / hour) + "시간 전";
    }
    return new Date(isoString).toLocaleDateString("ko-KR");
  }

  function trackPageVisit(current) {
    if (!current) {
      return;
    }
    var visits = storage.get("yechan-page-visits", {});
    var previous = visits[current] || {};
    visits[current] = {
      count: (previous.count || 0) + 1,
      last: new Date().toISOString(),
      title: pageTitles[current] || current
    };
    storage.set("yechan-page-visits", visits);
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
    trackPageVisit(current);

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

  function normalizeSearchText(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function filterSitePages(query) {
    var normalized = normalizeSearchText(query);
    if (!normalized) {
      return sitePages.slice();
    }
    var terms = normalized.split(" ");
    return sitePages.filter(function (item) {
      var haystack = normalizeSearchText([
        item.title,
        item.category,
        item.description,
        item.keywords
      ].join(" "));
      return terms.every(function (term) {
        return haystack.indexOf(term) !== -1;
      });
    });
  }

  function renderSearchResults(input, results, count, limit) {
    var query = input.value;
    var matches = filterSitePages(query);
    var visible = matches.slice(0, limit || matches.length);
    if (count) {
      count.textContent = matches.length + "개 결과" + (query.trim() ? " · 검색어: " + query.trim() : "");
    }
    if (!visible.length) {
      results.innerHTML = '<p class="empty-state">검색 결과가 없습니다. 다른 키워드를 입력해보세요.</p>';
      return;
    }
    results.innerHTML = visible.map(function (item) {
      return [
        '<a class="search-result" href="' + item.href + '">',
        '<span class="tag-line">' + escapeHTML(item.category) + "</span>",
        "<strong>" + escapeHTML(item.title) + "</strong>",
        "<small>" + escapeHTML(item.description) + "</small>",
        "</a>"
      ].join("");
    }).join("");
  }

  function initSiteSearch() {
    var widgets = $$(".site-search-widget");
    if (!widgets.length) {
      return;
    }
    widgets.forEach(function (widget) {
      var input = $("[data-site-search-input]", widget);
      var results = $("[data-site-search-results]", widget);
      var count = $("[data-site-search-count]", widget);
      if (!input || !results) {
        return;
      }
      var params = new URLSearchParams(window.location.search);
      if (document.body.dataset.page === "search" && params.get("q")) {
        input.value = params.get("q");
      }
      var limit = results.classList.contains("compact") ? 4 : 20;
      var run = function () {
        renderSearchResults(input, results, count, limit);
      };
      input.addEventListener("input", run);
      $$("[data-search-chip]", widget).forEach(function (button) {
        button.addEventListener("click", function () {
          input.value = button.dataset.searchChip || "";
          run();
          input.focus();
        });
      });
      run();
    });
  }

  function initPracticePager() {
    var page = document.body.dataset.page;
    var index = practicePages.findIndex(function (item) {
      return item.id === page;
    });
    var footer = $(".site-footer");
    if (index === -1 || !footer) {
      return;
    }
    var prev = practicePages[(index - 1 + practicePages.length) % practicePages.length];
    var next = practicePages[(index + 1) % practicePages.length];
    var section = document.createElement("section");
    section.className = "section-band compact";
    section.innerHTML = [
      '<div class="shell practice-pager">',
      '<a class="pager-link" href="' + prev.href + '"><span>이전 실습</span><strong>' + escapeHTML(prev.title) + "</strong></a>",
      '<a class="pager-link center" href="dashboard.html"><span>진행률 보기</span><strong>Dashboard</strong></a>',
      '<a class="pager-link" href="' + next.href + '"><span>다음 실습</span><strong>' + escapeHTML(next.title) + "</strong></a>",
      "</div>"
    ].join("");
    footer.parentNode.insertBefore(section, footer);
  }

  function initPresentation() {
    var deck = $("#presentationMode");
    if (!deck) {
      return;
    }
    var slides = $$("[data-slide]", deck);
    var dots = $("#slideDots");
    var counter = $("#slideCounter");
    var prev = $("#prevSlide");
    var next = $("#nextSlide");
    var key = "yechan-presentation-slide";
    var activeIndex = Math.min(Number(storage.get(key, 0)) || 0, slides.length - 1);

    function renderSlide() {
      slides.forEach(function (slide, index) {
        slide.classList.toggle("is-active", index === activeIndex);
      });
      counter.textContent = (activeIndex + 1) + " / " + slides.length;
      dots.innerHTML = slides.map(function (_, index) {
        return '<button type="button" class="' + (index === activeIndex ? "is-active" : "") + '" data-slide-dot="' + index + '" aria-label="' + (index + 1) + '번 슬라이드"></button>';
      }).join("");
      storage.set(key, activeIndex);
    }

    function moveSlide(delta) {
      activeIndex = (activeIndex + delta + slides.length) % slides.length;
      renderSlide();
    }

    prev.addEventListener("click", function () {
      moveSlide(-1);
    });
    next.addEventListener("click", function () {
      moveSlide(1);
    });
    dots.addEventListener("click", function (event) {
      if (!event.target.matches("[data-slide-dot]")) {
        return;
      }
      activeIndex = Number(event.target.dataset.slideDot);
      renderSlide();
    });
    window.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        moveSlide(-1);
      }
      if (event.key === "ArrowRight") {
        moveSlide(1);
      }
    });
    renderSlide();
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

  function initDashboard() {
    var dashboard = $("#dashboardRoot");
    if (!dashboard) {
      return;
    }

    var doneKey = "yechan-dashboard-done";
    var favoriteKey = "yechan-dashboard-favorites";
    var checklistKey = "yechan-dashboard-checklist";
    var memoKey = "yechan-dashboard-memo";
    var quizKey = "yechan-dashboard-quiz";
    var done = storage.get(doneKey, {});
    var favorites = storage.get(favoriteKey, {});
    var checklist = storage.get(checklistKey, {});

    var progressDial = $("#progressDial");
    var progressPercent = $("#progressPercent");
    var doneCount = $("#doneCount");
    var visitedCount = $("#visitedCount");
    var favoriteCount = $("#favoriteCount");
    var practiceTrack = $("#practiceTrack");
    var favoriteList = $("#favoriteList");
    var recentList = $("#recentList");
    var checklistBox = $("#submitChecklist");
    var checklistStatus = $("#checklistStatus");
    var exportButton = $("#dashboardExport");
    var exportStatus = $("#dashboardExportStatus");
    var memo = $("#dashboardMemo");
    var memoCount = $("#memoCount");
    var quizForm = $("#quizForm");
    var quizResult = $("#quizResult");

    function saveDone() {
      storage.set(doneKey, done);
    }

    function saveFavorites() {
      storage.set(favoriteKey, favorites);
    }

    function renderPracticeRows() {
      var visits = storage.get("yechan-page-visits", {});
      practiceTrack.innerHTML = practicePages.map(function (item) {
        var checked = done[item.id] ? " checked" : "";
        var favorite = favorites[item.id];
        var visit = visits[item.href];
        return [
          '<div class="practice-row' + (done[item.id] ? " is-done" : "") + '">',
          '<label>',
          '<input type="checkbox" data-practice-toggle="' + item.id + '"' + checked + ">",
          "<span>",
          "<strong>" + escapeHTML(item.title) + "</strong>",
          "<small>" + escapeHTML(item.detail) + " · " + formatTimeAgo(visit && visit.last) + "</small>",
          "</span>",
          "</label>",
          '<div class="practice-actions">',
          '<button class="text-button" type="button" data-favorite-toggle="' + item.id + '">' + (favorite ? "즐겨찾기 해제" : "즐겨찾기") + "</button>",
          '<a href="' + item.href + '">열기</a>',
          "</div>",
          "</div>"
        ].join("");
      }).join("");
    }

    function renderFavorites() {
      var selected = practicePages.filter(function (item) {
        return favorites[item.id];
      });
      if (!selected.length) {
        favoriteList.innerHTML = '<p class="empty-state">즐겨찾기한 실습이 없습니다.</p>';
        return;
      }
      favoriteList.innerHTML = selected.map(function (item) {
        return '<a href="' + item.href + '"><strong>' + escapeHTML(item.title) + '</strong><span>' + escapeHTML(item.detail) + "</span></a>";
      }).join("");
    }

    function renderRecent() {
      var visits = storage.get("yechan-page-visits", {});
      var entries = Object.keys(visits).map(function (href) {
        return {
          href: href,
          title: visits[href].title || pageTitles[href] || href,
          last: visits[href].last,
          count: visits[href].count || 0
        };
      }).sort(function (a, b) {
        return new Date(b.last) - new Date(a.last);
      }).slice(0, 6);

      if (!entries.length) {
        recentList.innerHTML = '<p class="empty-state">아직 방문 기록이 없습니다.</p>';
        return;
      }
      recentList.innerHTML = entries.map(function (item) {
        return '<a href="' + item.href + '"><strong>' + escapeHTML(item.title) + '</strong><span>' + formatTimeAgo(item.last) + " · " + item.count + "회 방문</span></a>";
      }).join("");
    }

    function renderSummary() {
      var visits = storage.get("yechan-page-visits", {});
      var complete = practicePages.filter(function (item) {
        return done[item.id];
      }).length;
      var visited = practicePages.filter(function (item) {
        return visits[item.href];
      }).length;
      var favoriteTotal = practicePages.filter(function (item) {
        return favorites[item.id];
      }).length;
      var percent = Math.round((complete / practicePages.length) * 100);
      progressDial.style.setProperty("--progress", percent + "%");
      progressPercent.textContent = percent + "%";
      doneCount.textContent = complete + "/" + practicePages.length;
      visitedCount.textContent = visited + "/" + practicePages.length;
      favoriteCount.textContent = favoriteTotal;
    }

    function renderChecklist() {
      var inputs = $$("input[type='checkbox']", checklistBox);
      var checkedCount = 0;
      inputs.forEach(function (input) {
        input.checked = Boolean(checklist[input.value]);
        if (input.checked) {
          checkedCount += 1;
        }
      });
      checklistStatus.textContent = "제출 준비 " + checkedCount + "/" + inputs.length + " 완료";
    }

    function renderAll() {
      renderSummary();
      renderPracticeRows();
      renderFavorites();
      renderRecent();
      renderChecklist();
    }

    practiceTrack.addEventListener("change", function (event) {
      if (!event.target.matches("[data-practice-toggle]")) {
        return;
      }
      done[event.target.dataset.practiceToggle] = event.target.checked;
      saveDone();
      renderAll();
    });

    practiceTrack.addEventListener("click", function (event) {
      if (!event.target.matches("[data-favorite-toggle]")) {
        return;
      }
      var id = event.target.dataset.favoriteToggle;
      favorites[id] = !favorites[id];
      if (!favorites[id]) {
        delete favorites[id];
      }
      saveFavorites();
      renderAll();
    });

    $("#markAllDone").addEventListener("click", function () {
      practicePages.forEach(function (item) {
        done[item.id] = true;
      });
      saveDone();
      renderAll();
    });

    $("#dashboardReset").addEventListener("click", function () {
      if (!confirm("대시보드 기록을 초기화할까요?")) {
        return;
      }
      done = {};
      favorites = {};
      checklist = {};
      storage.remove(doneKey);
      storage.remove(favoriteKey);
      storage.remove(checklistKey);
      storage.remove(memoKey);
      storage.remove(quizKey);
      memo.value = "";
      updateMemoCount();
      quizResult.textContent = "";
      renderAll();
    });

    exportButton.addEventListener("click", function () {
      var exportData = {
        exportedAt: new Date().toISOString(),
        done: storage.get(doneKey, {}),
        favorites: storage.get(favoriteKey, {}),
        checklist: storage.get(checklistKey, {}),
        memo: storage.get(memoKey, ""),
        quiz: storage.get(quizKey, null),
        visits: storage.get("yechan-page-visits", {})
      };
      var blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "yechan-dashboard-data.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      exportStatus.textContent = "대시보드 데이터를 JSON 파일로 내보냈습니다.";
    });

    checklistBox.addEventListener("change", function (event) {
      if (!event.target.matches("input[type='checkbox']")) {
        return;
      }
      checklist[event.target.value] = event.target.checked;
      if (!event.target.checked) {
        delete checklist[event.target.value];
      }
      storage.set(checklistKey, checklist);
      renderChecklist();
    });

    function updateMemoCount() {
      memoCount.textContent = memo.value.length + " / 500";
    }

    memo.value = storage.get(memoKey, "");
    memo.addEventListener("input", function () {
      storage.set(memoKey, memo.value);
      updateMemoCount();
    });
    $("#clearDashboardMemo").addEventListener("click", function () {
      memo.value = "";
      storage.remove(memoKey);
      updateMemoCount();
    });
    updateMemoCount();

    var savedQuiz = storage.get(quizKey, null);
    if (savedQuiz) {
      quizResult.textContent = "최근 점수: " + savedQuiz.score + "/3점";
    }

    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var answers = { q1: "a", q2: "a", q3: "a" };
      var score = Object.keys(answers).reduce(function (total, name) {
        var selected = quizForm.querySelector("input[name='" + name + "']:checked");
        return total + (selected && selected.value === answers[name] ? 1 : 0);
      }, 0);
      storage.set(quizKey, {
        score: score,
        savedAt: new Date().toISOString()
      });
      quizResult.textContent = "점수: " + score + "/3점 · " + (score === 3 ? "핵심 개념을 잘 이해했습니다." : "틀린 문항을 다시 확인해보세요.");
    });

    renderAll();
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

  function setDomStyleStatus(message) {
    var result = $("#domStyleResult");
    var state = $("#styleState");
    if (result) {
      result.textContent = message;
    }
    if (state) {
      state.textContent = "현재 상태: " + message;
    }
  }

  window.changeColor = function () {
    var obj = document.getElementById("target");
    if (!obj) {
      return;
    }
    obj.style.color = "red";
    setDomStyleStatus("글자색을 빨강으로 변경했습니다.");
  };

  window.changeSize = function () {
    var obj = document.getElementById("target");
    if (!obj) {
      return;
    }
    obj.style.fontSize = "32px";
    setDomStyleStatus("글자 크기를 32px로 변경했습니다.");
  };

  window.changeBackground = function () {
    var obj = document.getElementById("target");
    if (!obj) {
      return;
    }
    obj.style.backgroundColor = "yellow";
    setDomStyleStatus("배경색을 노랑으로 강조했습니다.");
  };

  window.toggleVisibility = function () {
    var obj = document.getElementById("target");
    if (!obj) {
      return;
    }
    if (obj.style.display === "none") {
      obj.style.display = "block";
      setDomStyleStatus("문장을 다시 보이게 했습니다.");
    } else {
      obj.style.display = "none";
      setDomStyleStatus("문장을 숨겼습니다.");
    }
  };

  window.resetDomStyle = function () {
    var obj = document.getElementById("target");
    if (!obj) {
      return;
    }
    obj.removeAttribute("style");
    setDomStyleStatus("기본 스타일로 초기화했습니다.");
  };

  function initDomStyle() {
    if (!$("#target")) {
      return;
    }
    setDomStyleStatus("기본 스타일");
  }

  function initDomList() {
    var list = $("#commentList");
    if (!list) {
      return;
    }
    var form = $("#domCommentForm");
    var input = $("#commentInput");
    var promptButton = $("#commentPrompt");
    var clear = $("#commentClear");
    var status = $("#commentStatus");
    var key = "yechan-dom-comments";
    var savedComments = storage.get(key, []);

    function saveComments() {
      var values = $$("#commentList li strong").map(function (item) {
        return item.textContent;
      }).filter(function (value) {
        return value !== "댓글이 없습니다";
      });
      storage.set(key, values);
    }

    function addComment(value, shouldSave) {
      var text = String(value || "").trim();
      if (!text) {
        if (status) {
          status.textContent = "댓글 내용을 입력해주세요.";
        }
        return;
      }
      var newLi = document.createElement("li");
      newLi.innerHTML = "<div><strong>" + escapeHTML(text) + "</strong><small>클릭하면 삭제됩니다.</small></div>";
      newLi.onclick = function () {
        var p = this.parentElement;
        p.removeChild(this);
        saveComments();
        if (!p.children.length) {
          p.innerHTML = "<li><div><strong>댓글이 없습니다</strong><small>새 댓글을 추가해보세요.</small></div></li>";
        }
        if (status) {
          status.textContent = "선택한 댓글을 삭제했습니다.";
        }
      };
      list.appendChild(newLi);
      if (shouldSave) {
        saveComments();
      }
      if (status) {
        status.textContent = "댓글을 추가했습니다.";
      }
    }

    if (savedComments.length) {
      savedComments.forEach(function (comment) {
        addComment(comment, false);
      });
    } else {
      list.innerHTML = "<li><div><strong>댓글이 없습니다</strong><small>새 댓글을 추가해보세요.</small></div></li>";
    }

    function ensureRealList() {
      var empty = $("#commentList li strong");
      if (empty && empty.textContent === "댓글이 없습니다") {
        list.innerHTML = "";
      }
    }

    function addFromPrompt() {
      var inputStr = null;
      try {
        inputStr = prompt("댓글 내용을 입력하세요.");
      } catch (error) {
        if (status) {
          status.textContent = "이 브라우저에서는 prompt가 막혀 있어 입력 칸으로 댓글을 추가합니다.";
        }
        if (input) {
          input.focus();
        }
        return;
      }
      if (inputStr !== null && inputStr.trim()) {
        ensureRealList();
        addComment(inputStr, true);
      }
    }

    if (!savedComments.length) {
      addFromPrompt();
    }

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        ensureRealList();
        addComment(input.value, true);
        input.value = "";
      });
    }

    if (promptButton) {
      promptButton.addEventListener("click", addFromPrompt);
    }

    if (clear) {
      clear.addEventListener("click", function () {
        list.innerHTML = "<li><div><strong>댓글이 없습니다</strong><small>새 댓글을 추가해보세요.</small></div></li>";
        storage.set(key, []);
        if (status) {
          status.textContent = "댓글을 모두 삭제했습니다.";
        }
      });
    }
  }

  function formatWon(value) {
    return Number(value || 0).toLocaleString("ko-KR") + "원";
  }

  function getOrderItems() {
    var checks = document.getElementsByClassName("menu-check");
    var qtys = document.getElementsByClassName("menu-qty");
    var items = [];
    for (var i = 0; i < checks.length; i += 1) {
      if (checks[i].checked) {
        var price = parseInt(checks[i].value, 10);
        var quantity = parseInt(qtys[i].value, 10) || 1;
        var name = checks[i].closest(".menu-item").querySelector("strong").textContent;
        items.push({
          name: name,
          price: price,
          quantity: quantity,
          subtotal: price * quantity
        });
      }
    }
    return items;
  }

  window.recalc = function () {
    var total = 0;
    var checks = document.getElementsByClassName("menu-check");
    var qtys = document.getElementsByClassName("menu-qty");
    var totalInput = document.getElementById("total");
    var result = document.getElementById("orderResult");
    for (var i = 0; i < checks.length; i += 1) {
      if (checks[i].checked) {
        var price = parseInt(checks[i].value, 10);
        var quantity = parseInt(qtys[i].value, 10) || 1;
        total += price * quantity;
      }
    }
    if (totalInput) {
      totalInput.value = total;
    }
    if (result) {
      result.textContent = "현재 총액: " + formatWon(total);
    }
    return total;
  };

  window.validateAddress = function () {
    var address = document.getElementById("address");
    var result = document.getElementById("orderResult");
    if (!address || address.value.trim()) {
      return true;
    }
    if (result) {
      result.textContent = "배달 주소를 입력해주세요.";
    }
    alert("배달 주소를 입력해주세요.");
    setTimeout(function () {
      address.focus();
    }, 0);
    return false;
  };

  window.validate = function (e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    var total = window.recalc();
    var result = document.getElementById("orderResult");
    var receipt = document.getElementById("orderReceipt");
    var address = document.getElementById("address");
    if (total === 0) {
      alert("메뉴를 선택해주세요.");
      if (result) {
        result.textContent = "메뉴를 하나 이상 선택해야 주문할 수 있습니다.";
      }
      return false;
    }
    if (address && !address.value.trim()) {
      window.validateAddress();
      return false;
    }
    var items = getOrderItems();
    if (receipt) {
      receipt.innerHTML = [
        "<li>",
        "<div>",
        "<strong>총액: " + formatWon(total) + "</strong>",
        "<small>" + escapeHTML(items.map(function (item) {
          return item.name + " " + item.quantity + "개";
        }).join(", ")) + "</small>",
        "</div>",
        "</li>"
      ].join("");
    }
    alert("주문 완료! 총액: " + formatWon(total));
    if (result) {
      result.textContent = "주문 완료! 총액은 " + formatWon(total) + "입니다.";
    }
    return false;
  };

  function initEventOrder() {
    if (!$("#orderForm")) {
      return;
    }
    var receipt = $("#orderReceipt");
    $$(".menu-check, .menu-qty").forEach(function (field) {
      field.addEventListener("input", window.recalc);
      field.addEventListener("change", window.recalc);
    });
    if (receipt) {
      receipt.innerHTML = "<li><div><strong>주문 내역이 없습니다</strong><small>메뉴를 선택하고 주문하기를 눌러보세요.</small></div></li>";
    }
    window.recalc();
  }

  function initEventCar() {
    var car = document.getElementById("car");
    var stage = document.getElementById("carStage");
    if (!car || !stage) {
      return;
    }
    var x = 100;
    var y = 100;
    var step = 10;
    var borderWidth = 5;
    var status = document.getElementById("carStatus");

    function render(message) {
      car.style.left = x + "px";
      car.style.top = y + "px";
      if (status) {
        status.textContent = (message || "이동 준비 완료") + " · 현재 좌표 (" + x + ", " + y + ") · 이동 거리 " + step + "px";
      }
    }

    function move(dx, dy) {
      var maxX = stage.clientWidth - car.offsetWidth - borderWidth;
      var maxY = stage.clientHeight - car.offsetHeight - borderWidth;
      var nextX = Math.max(borderWidth, Math.min(maxX, x + dx));
      var nextY = Math.max(borderWidth, Math.min(maxY, y + dy));
      var blocked = nextX !== x + dx || nextY !== y + dy;
      x = nextX;
      y = nextY;
      render(blocked ? "경계에 닿았습니다" : "자동차를 이동했습니다");
    }

    window.onkeydown = function (e) {
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 37:
          e.preventDefault();
          move(-step, 0);
          break;
        case 38:
          e.preventDefault();
          move(0, -step);
          break;
        case 39:
          e.preventDefault();
          move(step, 0);
          break;
        case 40:
          e.preventDefault();
          move(0, step);
          break;
      }
    };

    $$("#carControls button").forEach(function (button) {
      button.addEventListener("click", function () {
        var direction = button.dataset.carMove;
        if (direction === "left") {
          move(-step, 0);
        } else if (direction === "right") {
          move(step, 0);
        } else if (direction === "up") {
          move(0, -step);
        } else if (direction === "down") {
          move(0, step);
        }
      });
    });

    $("#carFaster") && $("#carFaster").addEventListener("click", function () {
      step = Math.min(40, step + 5);
      render("이동 속도를 올렸습니다");
    });

    $("#carSlower") && $("#carSlower").addEventListener("click", function () {
      step = Math.max(5, step - 5);
      render("이동 속도를 낮췄습니다");
    });

    $("#carReset") && $("#carReset").addEventListener("click", function () {
      x = 100;
      y = 100;
      step = 10;
      render("자동차 위치를 초기화했습니다");
    });

    render();
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
  initDashboard();
  initSiteSearch();
  initPracticePager();
  initPresentation();
  initRandomPicker();
  initDomStyle();
  initDomList();
  initEventOrder();
  initEventCar();
  initContact();
})();
