document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');

    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const starSelectScreen = document.getElementById('starSelectScreen');
    const chatActiveScreen = document.getElementById('chatActiveScreen');
    const kpopStarGrid = document.getElementById('kpopStarGrid');
    const actorStarGrid = document.getElementById('actorStarGrid');
    const customStarInput = document.getElementById('customStarInput');
    const customStarBtn = document.getElementById('customStarBtn');
    const chatChangeStar = document.getElementById('chatChangeStar');
    const chatStarAvatar = document.getElementById('chatStarAvatar');
    const chatStarName = document.getElementById('chatStarName');
    const chatStarGroup = document.getElementById('chatStarGroup');

    const ttsBtn = document.getElementById('ttsBtn');
    const sourceTag = document.getElementById('sourceTag');

    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    const learnSubTab = document.getElementById('learnSubTab');
    const listenSubTab = document.getElementById('listenSubTab');
    const speakSubTab = document.getElementById('speakSubTab');
    const categoryChips = document.getElementById('categoryChips');
    const sentencesList = document.getElementById('sentencesList');
    const randomBtn = document.getElementById('randomBtn');

    const learnBrowser = document.getElementById('learnBrowser');
    const learnContent = document.getElementById('learnContent');
    const learnHeader = document.getElementById('learnHeader');
    const learnSentenceKr = document.getElementById('learnSentenceKr');
    const learnSentenceTr = document.getElementById('learnSentenceTr');
    const grammarLoading = document.getElementById('grammarLoading');
    const grammarCards = document.getElementById('grammarCards');
    const learnNextBtn = document.getElementById('learnNextBtn');

    const listenPlaceholder = document.getElementById('listenPlaceholder');
    const listenView = document.getElementById('listenView');
    const stageHeader = document.getElementById('stageHeader');
    const lyricOriginal = document.getElementById('lyricOriginal');
    const lyricPhonetic = document.getElementById('lyricPhonetic');
    const lyricLoading = document.getElementById('lyricLoading');
    const lyricLangLabel = document.getElementById('lyricLangLabel');
    const stageListenBtn = document.getElementById('stageListenBtn');
    const listenNextBtn = document.getElementById('listenNextBtn');

    const speakPlaceholder = document.getElementById('speakPlaceholder');
    const speakView = document.getElementById('speakView');
    const speakOriginal = document.getElementById('speakOriginal');
    const speakListenBtn = document.getElementById('speakListenBtn');
    const stageRecordBtn = document.getElementById('stageRecordBtn');
    const recordLabel = document.getElementById('recordLabel');
    const recordingPlayback = document.getElementById('recordingPlayback');
    const playRecordingBtn = document.getElementById('playRecordingBtn');
    const waveformWrap = document.getElementById('waveformWrap');
    const waveformCanvas = document.getElementById('waveformCanvas');
    const sttFeedback = document.getElementById('sttFeedback');
    const speakBackBtn = document.getElementById('speakBackBtn');
    const uiLangSelect = document.getElementById('uiLangSelect');

    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = {
        home: document.getElementById('homePage'),
        practice: document.getElementById('practicePage'),
        lab: document.getElementById('labPage'),
        profile: document.getElementById('profilePage')
    };
    const homeContent = document.getElementById('homeContent');

    const HAS_GEMINI = document.body.dataset.hasGemini === 'true';

    let selectedLang = 'all';
    let lastOriginal = '';
    let dashboardData = {};
    const GAUGE_CIRCUMFERENCE = 314.16;
    const ttsCache = {};
    let currentAudio = null;
    let currentEmotion = null;
    let currentSource = null;
    let selectedCategory = '__all__';
    let homeDataLoaded = false;
    let homeGroupedData = null;
    let shuffleEnabled = localStorage.getItem('kvoice_shuffle') !== 'false';
    const generatedCardIds = { kpop: [], drama: [], trending: [] };

    let stageConversions = null;
    const STAGE_DEFAULT_LANG = 'english';
    const UI_TO_PHONETIC = {
        en: 'english', ko: 'english', ja: 'japanese', zh: 'chinese',
        es: 'spanish', pt: 'portuguese', fr: 'french',
        vi: 'vietnamese', id: 'indonesian', ar: 'arabic'
    };
    const translationCache = {};
    let isRecording = false;
    let mediaRecorder = null;
    let recordedChunks = [];
    let recordedBlob = null;
    let audioContext = null;
    let analyser = null;
    let waveformAnimId = null;

    const RTL_LANGUAGES = ['arabic'];
    const SCRIPT_FONTS = {
        'japanese': "'Noto Sans JP', sans-serif",
        'chinese': "'Noto Sans SC', sans-serif",
        'thai': "'Noto Sans Thai', sans-serif",
        'arabic': "'Noto Sans Arabic', sans-serif",
    };

    const EMOTION_EMOJI = {
        'happy': '😊',
        'energetic': '🔥',
        'sad': '😢',
        'romantic': '💕',
        'dramatic': '🎭',
        'calm': '🍃',
    };

    function emotionLabel(key) {
        return t('emotion_' + key) || key;
    }

    function sourceTypeLabel(type) {
        if (type === 'kpop') return t('source_kpop');
        if (type === 'trending') return t('source_trending');
        return t('source_drama');
    }

    const ALBUM_GRADIENTS = [
        'linear-gradient(135deg, #1a1035 0%, #2d1b69 60%, #ff2d78 100%)',
        'linear-gradient(135deg, #0d1b2a 0%, #1b2838 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 60%, #b44dff 100%)',
        'linear-gradient(135deg, #0f1923 0%, #162447 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #1f0c2e 0%, #4a1942 60%, #ff2d78 100%)',
        'linear-gradient(135deg, #0a1628 0%, #1a2f4e 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #1a0e30 0%, #2e1065 60%, #b44dff 100%)',
        'linear-gradient(135deg, #12192c 0%, #1e3a5f 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #200a1f 0%, #4a1040 60%, #ff2d78 100%)',
        'linear-gradient(135deg, #0b1a2a 0%, #1a3050 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #150a30 0%, #2a1060 60%, #b44dff 100%)',
        'linear-gradient(135deg, #0d1520 0%, #1a2a44 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #1a0520 0%, #3d1040 60%, #ff2d78 100%)',
        'linear-gradient(135deg, #0a1420 0%, #152840 60%, #00d4ff 100%)',
        'linear-gradient(135deg, #120a28 0%, #251055 60%, #b44dff 100%)',
    ];

    const KPOP_ICON_SVG = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>';
    const DRAMA_ICON_SVG = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>';
    const TRENDING_ICON_SVG = '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';

    function initLangSelector() {
        uiLangSelect.innerHTML = '';
        const current = getUILang();
        UI_LANG_OPTIONS.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.code;
            option.textContent = `${opt.flag} ${opt.label}`;
            if (opt.code === current) option.selected = true;
            uiLangSelect.appendChild(option);
        });
    }

    uiLangSelect.addEventListener('change', () => {
        setUILang(uiLangSelect.value);
        applyTranslations();
        if (homeGroupedData) renderHome(homeGroupedData);

        if (currentSource) {
            renderStageHeader(currentSource);
            if (stageConversions) {
                const newPhoneticLang = UI_TO_PHONETIC[getUILang()] || STAGE_DEFAULT_LANG;
                renderStageLang(stageConversions, newPhoneticLang);
                fetchTranslation(lastOriginal, newPhoneticLang);
            }
        }

        renderSourceTag();
        loadSentences();

        if (currentSentenceForPractice && !grammarCards.classList.contains('hidden')) {
            loadGrammarAnalysis(currentSentenceForPractice.text);
        }

        if (personasList.length) renderStarGrid();
        updateProfileStarName();
        updateProfileSubBadge();
        loadUsageStatus();
    });

    function applyTranslations() {
        document.documentElement.lang = getUILang();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            el.innerHTML = t(el.dataset.i18nHtml);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = t(el.dataset.i18nTitle);
        });
    }

    initLangSelector();
    applyTranslations();

    let practiceFromCard = false;

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'practice') practiceFromCard = false;
            switchPage(page);
        });
    });

    function switchPage(page) {
        if (isRecording) stopRecording();

        navBtns.forEach(b => b.classList.remove('active'));
        navBtns.forEach(b => { if (b.dataset.page === page) b.classList.add('active'); });

        Object.values(pages).forEach(p => p.classList.add('hidden'));
        if (pages[page]) pages[page].classList.remove('hidden');

        if (page === 'home' && !homeDataLoaded) {
            loadHomeData();
        }

        if (page === 'practice') {
            updatePracticeView();
        }

        if (page === 'lab') {
            updateLabView();
        }

        if (page === 'profile') {
            loadUsageStatus();
        }
    }

    function switchSubTab(tab) {
        if (isRecording) stopRecording();

        subTabBtns.forEach(b => b.classList.remove('active'));
        subTabBtns.forEach(b => { if (b.dataset.subtab === tab) b.classList.add('active'); });

        learnSubTab.classList.add('hidden');
        listenSubTab.classList.add('hidden');
        speakSubTab.classList.add('hidden');

        if (tab === 'learn') {
            learnSubTab.classList.remove('hidden');
            if (!learnContent.classList.contains('hidden')) {
            } else {
                loadSentences();
            }
        } else if (tab === 'listen') {
            listenSubTab.classList.remove('hidden');
        } else if (tab === 'speak') {
            speakSubTab.classList.remove('hidden');
        }
    }

    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchSubTab(btn.dataset.subtab);
        });
    });


    if (ttsBtn) ttsBtn.classList.add('hidden');

    function getLocalizedSourceTitle(s) {
        const lang = getUILang();
        const localTitle = (s.localized_titles && s.localized_titles[lang]) || (s.localized_titles && s.localized_titles['en']) || s.source_title;
        const localArtist = (s.localized_artists && s.localized_artists[lang]) || (s.localized_artists && s.localized_artists['en']) || s.source_artist;
        return localArtist ? `${localTitle} — ${localArtist}` : localTitle;
    }

    function getSourceIcon(s) {
        return s.source_type === 'kpop' ? '🎵' : s.source_type === 'trending' ? '⚡' : '🎬';
    }

    function renderSourceTag() {
        if (!sourceTag) return;
        sourceTag.innerHTML = '';
        if (!currentSource) {
            sourceTag.classList.add('hidden');
            return;
        }

        const s = currentSource;
        const badge = document.createElement('span');
        badge.className = `source-badge ${s.source_type}`;
        badge.textContent = `${getSourceIcon(s)} ${sourceTypeLabel(s.source_type)} · ${getLocalizedSourceTitle(s)}`;
        sourceTag.appendChild(badge);

        sourceTag.classList.remove('hidden');
    }

    function createCard(flag, name, phonetic, langKey) {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.dataset.langKey = langKey;

        const header = document.createElement('div');
        header.className = 'card-header';

        const flagSpan = document.createElement('span');
        flagSpan.className = 'card-flag';
        flagSpan.textContent = flag;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'card-lang-name';
        nameSpan.textContent = name;

        header.appendChild(flagSpan);
        header.appendChild(nameSpan);

        const phoneticDiv = document.createElement('div');
        phoneticDiv.className = 'card-phonetic';
        phoneticDiv.textContent = phonetic;

        if (RTL_LANGUAGES.includes(langKey)) {
            phoneticDiv.setAttribute('dir', 'rtl');
        }

        if (SCRIPT_FONTS[langKey]) {
            phoneticDiv.style.fontFamily = SCRIPT_FONTS[langKey];
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'card-copy-btn';
        copyBtn.textContent = t('btn_copy');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(phonetic).then(() => {
                copyBtn.textContent = t('btn_copied');
                setTimeout(() => copyBtn.textContent = t('btn_copy'), 1500);
            });
        });

        actionsDiv.appendChild(copyBtn);

        if (HAS_GEMINI) {
            const verifyBtn = document.createElement('button');
            verifyBtn.className = 'card-verify-btn';
            verifyBtn.textContent = t('btn_verify');
            verifyBtn.addEventListener('click', () => {
                verifyPhonetic(verifyBtn, card, lastOriginal, phonetic, langKey);
            });
            actionsDiv.appendChild(verifyBtn);
        }

        card.appendChild(header);
        card.appendChild(phoneticDiv);
        card.appendChild(actionsDiv);

        return card;
    }

    async function verifyPhonetic(btn, card, original, phonetic, language) {
        btn.disabled = true;
        btn.textContent = t('btn_verifying');
        btn.classList.add('verifying');

        const existingResult = card.querySelector('.verify-result');
        if (existingResult) existingResult.remove();

        updateDashboardScoreCell(language, 'loading');

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ original, phonetic, language })
            });

            if (!handleApiResponse(response, 'verify')) return;
            const data = await response.json();

            const resultDiv = document.createElement('div');
            resultDiv.className = 'verify-result';

            if (data.success) {
                resultDiv.innerHTML = '';

                const scoreBar = document.createElement('div');
                scoreBar.className = 'score-section';

                const scoreClass = getScoreClass(data.score);

                const scoreLabel = document.createElement('div');
                scoreLabel.className = `score-badge ${scoreClass}`;
                scoreLabel.textContent = `${data.score}${t('score_suffix')}`;

                const scoreFill = document.createElement('div');
                scoreFill.className = 'score-bar';
                const fill = document.createElement('div');
                fill.className = `score-fill ${scoreClass}`;
                fill.style.width = `${data.score}%`;
                scoreFill.appendChild(fill);

                scoreBar.appendChild(scoreLabel);
                scoreBar.appendChild(scoreFill);
                resultDiv.appendChild(scoreBar);

                if (data.back_translation) {
                    const btDiv = document.createElement('div');
                    btDiv.className = 'verify-back-translation';
                    const btLabel = document.createElement('span');
                    btLabel.className = 'verify-label';
                    btLabel.textContent = t('verify_back');
                    const btText = document.createElement('span');
                    btText.textContent = data.back_translation;
                    btDiv.appendChild(btLabel);
                    btDiv.appendChild(btText);
                    resultDiv.appendChild(btDiv);
                }

                if (data.feedback_ko) {
                    const fbDiv = document.createElement('div');
                    fbDiv.className = 'verify-feedback';
                    fbDiv.textContent = data.feedback_ko;
                    resultDiv.appendChild(fbDiv);
                }

                if (data.feedback_detail) {
                    const fdDiv = document.createElement('div');
                    fdDiv.className = 'verify-detail';
                    fdDiv.textContent = data.feedback_detail;
                    resultDiv.appendChild(fdDiv);
                }

                dashboardData[language].score = data.score;
                updateDashboardScoreCell(language, data.score);
                updateGauge();
            } else {
                resultDiv.className = 'verify-result verify-error';
                resultDiv.textContent = data.error || t('verify_failed');
                updateDashboardScoreCell(language, 'error');
            }

            card.appendChild(resultDiv);
            btn.textContent = t('btn_reverify');
        } catch (err) {
            console.error(err);
            btn.textContent = t('btn_error');
            updateDashboardScoreCell(language, 'error');
            setTimeout(() => { btn.textContent = t('btn_verify'); }, 2000);
        } finally {
            btn.disabled = false;
            btn.classList.remove('verifying');
        }
    }

    function getScoreClass(score) {
        if (score >= 90) return 'score-high';
        if (score >= 70) return 'score-mid';
        if (score >= 50) return 'score-low';
        return 'score-fail';
    }

    function buildDashboardTable() {
    }

    function updateDashboardScoreCell(langKey, scoreOrStatus) {
    }

    let chatHistory = [];
    let chatSending = false;
    let currentStarId = null;
    let currentCustomName = null;
    let personasList = [];

    function nickKey(nickname) {
        return (nickname || '').trim().toLowerCase().replace(/\s+/g, '_');
    }

    function saveChatForStar() {
        const nk = nickKey(currentNickname);
        if (!nk) return;
        try {
            const chatData = chatHistory.slice(-20);
            localStorage.setItem('kvoice_chatn_' + nk, JSON.stringify(chatData));
            const bubbles = [];
            chatMessages.querySelectorAll('.chat-bubble-wrap').forEach(w => {
                const role = w.classList.contains('user') ? 'user' : 'ai';
                const bubble = w.querySelector('.chat-bubble');
                const tipEl = w.querySelector('.chat-korean-tip-text');
                const tipRom = w.querySelector('.chat-korean-tip-detail');
                const corrEl = w.querySelector('.chat-correction-text');
                const corrExp = w.querySelector('.chat-correction-explain');
                bubbles.push({
                    role,
                    text: bubble ? bubble.textContent : '',
                    tip: tipEl ? tipEl.textContent : null,
                    tipDetail: tipRom ? tipRom.textContent : null,
                    corr: corrEl ? corrEl.textContent : null,
                    corrExp: corrExp ? corrExp.textContent : null,
                });
            });
            localStorage.setItem('kvoice_chatuin_' + nk, JSON.stringify(bubbles.slice(-20)));
            localStorage.setItem('kvoice_nickinfo_' + nk, JSON.stringify({
                starId: currentStarId,
                customName: currentCustomName,
                nickname: currentNickname,
            }));
        } catch (e) {}
    }

    function restoreChatForNickname(nickname, fallbackId) {
        const nk = nickKey(nickname);
        if (!nk) return false;
        try {
            let chatData = localStorage.getItem('kvoice_chatn_' + nk);
            let uiData = localStorage.getItem('kvoice_chatuin_' + nk);
            if (!chatData && !uiData && fallbackId) {
                const oldChat = localStorage.getItem('kvoice_chat_' + fallbackId);
                const oldUi = localStorage.getItem('kvoice_chatui_' + fallbackId);
                if (oldChat || oldUi) {
                    chatData = oldChat;
                    uiData = oldUi;
                    if (oldChat) localStorage.setItem('kvoice_chatn_' + nk, oldChat);
                    if (oldUi) localStorage.setItem('kvoice_chatuin_' + nk, oldUi);
                    localStorage.removeItem('kvoice_chat_' + fallbackId);
                    localStorage.removeItem('kvoice_chatui_' + fallbackId);
                }
            }
            if (chatData) chatHistory = JSON.parse(chatData);
            if (uiData) {
                const bubbles = JSON.parse(uiData);
                chatMessages.innerHTML = '';
                bubbles.forEach(b => {
                    const wrap = document.createElement('div');
                    wrap.className = 'chat-bubble-wrap ' + b.role;
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble';
                    bubble.textContent = b.text;
                    wrap.appendChild(bubble);
                    if (b.role === 'ai' && b.tip) {
                        const tip = document.createElement('div');
                        tip.className = 'chat-korean-tip';
                        tip.innerHTML = '<div class="chat-korean-tip-label">' + t('chat_korean_tip') + '</div><div class="chat-korean-tip-text">' + b.tip + '</div>' + (b.tipDetail ? '<div class="chat-korean-tip-detail">' + b.tipDetail + '</div>' : '');
                        wrap.appendChild(tip);
                    }
                    if (b.role === 'ai' && b.corr) {
                        const corr = document.createElement('div');
                        corr.className = 'chat-correction';
                        corr.innerHTML = '<div class="chat-correction-label">' + t('chat_correction_label') + '</div><div class="chat-correction-text">' + b.corr + '</div>' + (b.corrExp ? '<div class="chat-correction-explain">' + b.corrExp + '</div>' : '');
                        wrap.appendChild(corr);
                    }
                    chatMessages.appendChild(wrap);
                });
                chatMessages.scrollTop = chatMessages.scrollHeight;
                return true;
            }
        } catch (e) {}
        return false;
    }

    async function loadPersonas() {
        try {
            const res = await fetch('/api/personas');
            personasList = await res.json();
            renderStarGrid();
            renderOnboardingStarGrid();
            autoSelectDefaultStar();
        } catch (e) {
            console.error('Failed to load personas:', e);
        }
    }

    function createInitialEl(name) {
        const el = document.createElement('div');
        el.className = 'star-initial';
        el.textContent = (name || '?').charAt(0).toUpperCase();
        return el;
    }

    function setAvatarContent(container, photoUrl, name) {
        container.innerHTML = '';
        if (photoUrl) {
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = name || '';
            img.onerror = function() {
                this.replaceWith(createInitialEl(name));
            };
            container.appendChild(img);
        } else {
            container.appendChild(createInitialEl(name));
        }
    }

    function renderStarGrid() {
        kpopStarGrid.innerHTML = '';
        actorStarGrid.innerHTML = '';
        const lang = getUILang();

        personasList.forEach(star => {
            const card = document.createElement('div');
            card.className = 'star-card';
            card.dataset.starId = star.id;

            const photoWrap = document.createElement('div');
            photoWrap.className = 'star-card-photo';
            if (star.photo) {
                const img = document.createElement('img');
                img.src = star.photo;
                img.alt = star.name_en;
                img.loading = 'lazy';
                img.onerror = function() {
                    this.replaceWith(createInitialEl(star.name_en));
                };
                photoWrap.appendChild(img);
            } else {
                photoWrap.appendChild(createInitialEl(star.name_en));
            }

            const name = document.createElement('div');
            name.className = 'star-card-name';
            const localName = (star.names && star.names[lang]) || (lang === 'en' ? star.name_en : star.name_kr);
            name.textContent = localName.split(' (')[0];

            const group = document.createElement('div');
            group.className = 'star-card-group';
            group.textContent = star.category === 'actor' ? (t('star_category_actor') || 'Actor') : (t('star_category_kpop') || 'K-Pop');

            card.appendChild(photoWrap);
            card.appendChild(name);
            card.appendChild(group);

            card.addEventListener('click', () => selectStar(star.id));

            if (star.category === 'kpop') {
                kpopStarGrid.appendChild(card);
            } else {
                actorStarGrid.appendChild(card);
            }
        });
    }

    let pendingStarId = null;
    let pendingCustomName = null;
    let currentNickname = null;
    let currentGender = null;

    function selectStar(starId) {
        const star = personasList.find(s => s.id === starId);
        if (!star) return;

        saveChatForStar();

        const savedNickname = localStorage.getItem('kvoice_nickname_' + starId);
        if (savedNickname) {
            const savedGender = localStorage.getItem('kvoice_gender_' + starId) || 'neutral';
            activateStarWithNickname(starId, null, savedNickname, savedGender);
        } else {
            pendingStarId = starId;
            pendingCustomName = null;
            showNicknameInput();
        }
    }

    function selectCustomStar(name) {
        if (!name.trim()) return;

        saveChatForStar();

        const savedNickname = localStorage.getItem('kvoice_nickname_custom_' + name.trim());
        if (savedNickname) {
            const savedGender = localStorage.getItem('kvoice_gender_custom_' + name.trim()) || 'neutral';
            activateStarWithNickname(null, name.trim(), savedNickname, savedGender);
        } else {
            pendingStarId = null;
            pendingCustomName = name.trim();
            showNicknameInput();
        }
    }

    function showNicknameInput() {
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        const nicknameInput = document.getElementById('nicknameInput');
        if (!nicknameScreen || !nicknameInput) return;
        starSelectScreen.classList.add('hidden');
        chatActiveScreen.classList.add('hidden');
        const talkScreen = document.getElementById('talkbotActiveScreen');
        if (talkScreen) talkScreen.classList.add('hidden');
        const histScreen = document.getElementById('chatHistoryScreen');
        if (histScreen) histScreen.classList.add('hidden');
        nicknameScreen.classList.remove('hidden');
        nicknameInput.value = '';
        const genderRow = document.getElementById('genderSelectRow');
        if (genderRow) {
            genderRow.classList.add('hidden');
            genderRow.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
        }
        nicknameInput.focus();
    }

    let pendingGender = null;
    let genderDetected = false;

    async function confirmNickname() {
        const nicknameInput = document.getElementById('nicknameInput');
        const nickname = nicknameInput ? nicknameInput.value.trim() : '';
        if (!nickname) return;

        const genderRow = document.getElementById('genderSelectRow');

        if (!genderDetected) {
            if (genderRow) {
                genderRow.classList.remove('hidden');
                genderRow.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
            }
            try {
                const res = await fetch('/api/detect-gender', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nickname })
                });
                const data = await res.json();
                pendingGender = data.gender || 'neutral';
            } catch (e) {
                pendingGender = 'neutral';
            }
            if (pendingGender === 'neutral') pendingGender = 'female';
            if (genderRow) {
                genderRow.querySelectorAll('.gender-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.gender === pendingGender);
                });
            }
            genderDetected = true;
            return;
        }

        const selectedGender = pendingGender || 'female';
        genderDetected = false;
        pendingGender = null;

        if (pendingStarId) {
            localStorage.setItem('kvoice_nickname_' + pendingStarId, nickname);
            localStorage.setItem('kvoice_gender_' + pendingStarId, selectedGender);
            activateStarWithNickname(pendingStarId, null, nickname, selectedGender);
        } else if (pendingCustomName) {
            localStorage.setItem('kvoice_nickname_custom_' + pendingCustomName, nickname);
            localStorage.setItem('kvoice_gender_custom_' + pendingCustomName, selectedGender);
            activateStarWithNickname(null, pendingCustomName, nickname, selectedGender);
        }
    }

    function activateStarWithNickname(starId, customName, nickname, gender) {
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');

        currentStarId = starId;
        currentCustomName = customName;
        currentNickname = nickname;
        currentGender = gender || 'neutral';
        chatHistory = [];
        chatMessages.innerHTML = '';

        if (starId) {
            localStorage.setItem('kvoice_default_star', starId);
        }

        updateProfileStarName();

        setAvatarContent(chatStarAvatar, null, nickname);
        chatStarName.textContent = nickname;
        chatStarGroup.textContent = '';

        const talkStarAv = document.getElementById('talkStarAvatar');
        const talkStarNm = document.getElementById('talkStarName');
        const talkStarGr = document.getElementById('talkStarGroup');
        const talkMsgs = document.getElementById('talkMessages');
        if (talkStarAv) setAvatarContent(talkStarAv, null, nickname);
        if (talkStarNm) talkStarNm.textContent = nickname;
        if (talkStarGr) talkStarGr.textContent = '';
        if (talkMsgs) talkMsgs.innerHTML = '';

        starSelectScreen.classList.add('hidden');

        const lm = localStorage.getItem('kvoice_learning_mode') || 'hangul';
        if (lm === 'korean') {
            chatActiveScreen.classList.add('hidden');
            const talkScreen = document.getElementById('talkbotActiveScreen');
            if (talkScreen) talkScreen.classList.remove('hidden');
        } else {
            chatActiveScreen.classList.remove('hidden');
            const talkScreen = document.getElementById('talkbotActiveScreen');
            if (talkScreen) talkScreen.classList.add('hidden');
        }

        const fallbackId = starId || customName;
        const restored = restoreChatForNickname(nickname, fallbackId);
        if (!restored) {
            sendFirstMessage(nickname);
        }
    }

    async function sendFirstMessage(name) {
        addTypingIndicator();
        try {
            // Empty message triggers intro logic in chatbot.py
            const body = {
                message: "", 
                lang: getUILang(),
                history: [],
                nickname: currentNickname,
                gender: currentGender,
            };
            if (currentStarId) body.star_id = currentStarId;
            if (currentCustomName) body.custom_name = currentCustomName;

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!handleApiResponse(res, 'chat')) { removeTypingIndicator(); return; }
            const data = await res.json();
            removeTypingIndicator();

            if (data.reply) {
                chatHistory.push({ role: 'model', text: data.reply });
                addChatBubble('ai', data.reply, data);
            } else {
                addChatBubble('ai', 'Hey~ so happy you\'re here! What shall we talk about?', null);
            }
            saveChatForStar();
        } catch (e) {
            removeTypingIndicator();
            console.error("First message error:", e);
        }
    }

    function showStarSelect() {
        saveChatForStar();
        currentStarId = null;
        currentCustomName = null;
        currentNickname = null;
        chatHistory = [];
        chatMessages.innerHTML = '';
        chatActiveScreen.classList.add('hidden');
        const talkScreen = document.getElementById('talkbotActiveScreen');
        if (talkScreen) talkScreen.classList.add('hidden');
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');
        const histScreen = document.getElementById('chatHistoryScreen');
        if (histScreen) histScreen.classList.add('hidden');
        starSelectScreen.classList.remove('hidden');
    }

    function getSavedConversations() {
        const convos = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('kvoice_nickinfo_')) {
                try {
                    const info = JSON.parse(localStorage.getItem(key));
                    const nk = key.replace('kvoice_nickinfo_', '');
                    const uiData = localStorage.getItem('kvoice_chatuin_' + nk);
                    let preview = '';
                    let messageCount = 0;
                    if (uiData) {
                        const bubbles = JSON.parse(uiData);
                        messageCount = bubbles.length;
                        for (let j = bubbles.length - 1; j >= 0; j--) {
                            if (bubbles[j].text) {
                                preview = bubbles[j].text;
                                break;
                            }
                        }
                    }
                    convos.push({
                        nk: nk,
                        nickname: info.nickname || nk,
                        starId: info.starId || null,
                        customName: info.customName || null,
                        preview: preview,
                        messageCount: messageCount,
                    });
                } catch (e) {}
            }
        }
        return convos;
    }

    function showChatHistory() {
        const histScreen = document.getElementById('chatHistoryScreen');
        const histList = document.getElementById('chatHistoryList');
        const histEmpty = document.getElementById('chatHistoryEmpty');
        if (!histScreen || !histList) return;

        saveChatForStar();

        starSelectScreen.classList.add('hidden');
        chatActiveScreen.classList.add('hidden');
        const talkScreen = document.getElementById('talkbotActiveScreen');
        if (talkScreen) talkScreen.classList.add('hidden');
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');
        histScreen.classList.remove('hidden');

        const convos = getSavedConversations();
        histList.innerHTML = '';

        if (convos.length === 0) {
            if (histEmpty) histEmpty.classList.remove('hidden');
            return;
        }
        if (histEmpty) histEmpty.classList.add('hidden');

        convos.forEach(c => {
            const card = document.createElement('div');
            card.className = 'chat-history-card';

            const avatar = document.createElement('div');
            avatar.className = 'chat-history-avatar';
            avatar.textContent = (c.nickname || '?').charAt(0).toUpperCase();

            const info = document.createElement('div');
            info.className = 'chat-history-info';

            const name = document.createElement('div');
            name.className = 'chat-history-nickname';
            name.textContent = c.nickname;

            const prev = document.createElement('div');
            prev.className = 'chat-history-preview';
            prev.textContent = c.preview ? (c.preview.length > 50 ? c.preview.substring(0, 50) + '...' : c.preview) : (t('my_chats_empty') || 'No messages');

            info.appendChild(name);
            info.appendChild(prev);

            const delBtn = document.createElement('button');
            delBtn.className = 'chat-history-delete-btn';
            delBtn.title = t('my_chats_delete') || 'Delete';
            delBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(t('my_chats_delete_confirm') || 'Delete this conversation?')) {
                    localStorage.removeItem('kvoice_chatn_' + c.nk);
                    localStorage.removeItem('kvoice_chatuin_' + c.nk);
                    localStorage.removeItem('kvoice_nickinfo_' + c.nk);
                    if (c.starId) {
                        const savedNick = localStorage.getItem('kvoice_nickname_' + c.starId);
                        if (savedNick && nickKey(savedNick) === c.nk) {
                            localStorage.removeItem('kvoice_nickname_' + c.starId);
                        }
                    }
                    if (c.customName) {
                        const savedNick = localStorage.getItem('kvoice_nickname_custom_' + c.customName);
                        if (savedNick && nickKey(savedNick) === c.nk) {
                            localStorage.removeItem('kvoice_nickname_custom_' + c.customName);
                        }
                    }
                    showChatHistory();
                }
            });

            card.appendChild(avatar);
            card.appendChild(info);
            card.appendChild(delBtn);

            card.addEventListener('click', () => {
                resumeConversation(c);
            });

            histList.appendChild(card);
        });
    }

    function resumeConversation(convo) {
        const starId = convo.starId;
        const customName = convo.customName;
        const nickname = convo.nickname;
        let gender = 'neutral';
        if (starId) {
            localStorage.setItem('kvoice_nickname_' + starId, nickname);
            localStorage.setItem('kvoice_default_star', starId);
            gender = localStorage.getItem('kvoice_gender_' + starId) || 'neutral';
        } else if (customName) {
            localStorage.setItem('kvoice_nickname_custom_' + customName, nickname);
            gender = localStorage.getItem('kvoice_gender_custom_' + customName) || 'neutral';
        }

        activateStarWithNickname(starId, customName, nickname, gender);
    }

    function addChatBubble(role, text, data) {
        const wrap = document.createElement('div');
        wrap.className = `chat-bubble-wrap ${role}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        if (role === 'ai' && data) {
            bubble.textContent = data.reply || text;
            wrap.appendChild(bubble);

            if (data.korean_tip) {
                const tip = document.createElement('div');
                tip.className = 'chat-korean-tip';
                tip.innerHTML = `<div class="chat-korean-tip-label">${t('chat_korean_tip')}</div><div class="chat-korean-tip-text">${data.korean_tip}</div><div class="chat-korean-tip-detail">${data.korean_tip_romanized || ''} — ${data.korean_tip_meaning || ''}</div>`;
                wrap.appendChild(tip);
            }

            if (data.correction) {
                const corr = document.createElement('div');
                corr.className = 'chat-correction';
                corr.innerHTML = `<div class="chat-correction-label">${t('chat_correction_label')}</div><div class="chat-correction-text">${data.correction}</div>${data.explanation ? `<div class="chat-correction-explain">${data.explanation}</div>` : ''}`;
                wrap.appendChild(corr);
            }
        } else {
            bubble.textContent = text;
            wrap.appendChild(bubble);
        }

        chatMessages.appendChild(wrap);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const wrap = document.createElement('div');
        wrap.className = 'chat-bubble-wrap ai';
        wrap.id = 'chatTypingIndicator';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = '<div class="chat-typing"><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span></div>';
        wrap.appendChild(bubble);
        chatMessages.appendChild(wrap);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('chatTypingIndicator');
        if (el) el.remove();
    }

    async function sendChatMessage() {
        const msg = chatInput.value.trim();
        if (!msg || chatSending) return;
        if (!currentStarId && !currentCustomName) return;

        chatSending = true;
        chatSendBtn.disabled = true;
        chatInput.value = '';

        addChatBubble('user', msg, null);
        addTypingIndicator();

        try {
            const body = {
                message: msg,
                lang: getUILang(),
                history: chatHistory.slice(-10),
                nickname: currentNickname,
                gender: currentGender,
            };
            if (currentStarId) body.star_id = currentStarId;
            if (currentCustomName) body.custom_name = currentCustomName;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!handleApiResponse(response, 'chat')) { removeTypingIndicator(); return; }
            const data = await response.json();
            removeTypingIndicator();

            if (data.error && !data.reply) {
                addChatBubble('ai', data.error, null);
            } else {
                chatHistory.push({ role: 'user', text: msg });
                chatHistory.push({ role: 'model', text: data.reply || '' });
                addChatBubble('ai', data.reply, data);
            }
        } catch (err) {
            removeTypingIndicator();
            addChatBubble('ai', 'Connection error. Please try again.', null);
        }

        chatSending = false;
        chatSendBtn.disabled = false;
        chatInput.focus();
        saveChatForStar();
    }

    chatSendBtn.addEventListener('click', () => {
        flushChatComp();
        sendChatMessage();
    });
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            flushChatComp();
            sendChatMessage();
        }
    });

    let chatKbVisible = false;
    let chatCompState = [];
    let chatShiftActive = false;

    const chatKbToggle = document.getElementById('chatKbToggle');
    const chatHangulKeyboard = document.getElementById('chatHangulKeyboard');
    const chatKbPreview = document.getElementById('chatKbPreview');
    const chatKbKeys = document.getElementById('chatKbKeys');
    const chatKbShift = document.getElementById('chatKbShift');
    const chatKbSpace = document.getElementById('chatKbSpace');
    const chatKbBackspace = document.getElementById('chatKbBackspace');

    function toggleChatKb() {
        chatKbVisible = !chatKbVisible;
        if (chatKbVisible) {
            chatHangulKeyboard.classList.remove('hidden');
            chatKbToggle.classList.add('active');
            renderChatKb();
        } else {
            chatHangulKeyboard.classList.add('hidden');
            chatKbToggle.classList.remove('active');
        }
    }

    function renderChatKb() {
        renderHangulKeyboard(chatKbKeys, chatShiftActive, (ch) => {
            chatCompState.push(ch);
            updateChatKbPreview();
        });
    }

    function updateChatKbPreview() {
        const composing = composeFromState(chatCompState);
        chatKbPreview.textContent = composing;
    }

    function flushChatComp() {
        if (chatCompState.length === 0) return;
        const text = composeFromState(chatCompState);
        chatInput.value += text;
        chatCompState = [];
        updateChatKbPreview();
    }

    chatKbToggle.addEventListener('click', toggleChatKb);

    chatKbShift.addEventListener('click', () => {
        chatShiftActive = !chatShiftActive;
        chatKbShift.classList.toggle('active', chatShiftActive);
        renderChatKb();
    });

    chatKbSpace.addEventListener('click', () => {
        flushChatComp();
        chatCompState.push(' ');
        flushChatComp();
    });

    chatKbBackspace.addEventListener('click', () => {
        if (chatCompState.length > 0) {
            chatCompState.pop();
            updateChatKbPreview();
        } else if (chatInput.value.length > 0) {
            chatInput.value = chatInput.value.slice(0, -1);
        }
    });

    chatInput.addEventListener('focus', () => {
        if (chatKbVisible) {
            flushChatComp();
            chatKbVisible = false;
            chatHangulKeyboard.classList.add('hidden');
            chatKbToggle.classList.remove('active');
        }
    });

    chatChangeStar.addEventListener('click', showStarSelect);

    customStarBtn.addEventListener('click', () => {
        selectCustomStar(customStarInput.value);
        customStarInput.value = '';
    });

    customStarInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            selectCustomStar(customStarInput.value);
            customStarInput.value = '';
        }
    });

    const myChatsBtn = document.getElementById('myChatsBtn');
    if (myChatsBtn) myChatsBtn.addEventListener('click', showChatHistory);
    const chatHistoryBackBtn = document.getElementById('chatHistoryBackBtn');
    if (chatHistoryBackBtn) chatHistoryBackBtn.addEventListener('click', () => {
        const histScreen = document.getElementById('chatHistoryScreen');
        if (histScreen) histScreen.classList.add('hidden');
        starSelectScreen.classList.remove('hidden');
    });

    const nicknameConfirmBtn = document.getElementById('nicknameConfirmBtn');
    const nicknameBackBtn = document.getElementById('nicknameBackBtn');
    const nicknameInput = document.getElementById('nicknameInput');
    if (nicknameConfirmBtn) nicknameConfirmBtn.addEventListener('click', confirmNickname);
    if (nicknameBackBtn) nicknameBackBtn.addEventListener('click', () => {
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');
        starSelectScreen.classList.remove('hidden');
        pendingStarId = null;
        pendingCustomName = null;
        genderDetected = false;
        pendingGender = null;
    });
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            pendingGender = btn.dataset.gender;
        });
    });
    if (nicknameInput) nicknameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            confirmNickname();
        }
    });

    loadPersonas();

    function syncCardVerifyResult(langKey, data) {
        if (!document.getElementById('resultsContainer')) return;
        const card = document.getElementById('resultsContainer').querySelector(`.result-card[data-lang-key="${langKey}"]`);
        if (!card) return;

        const existingResult = card.querySelector('.verify-result');
        if (existingResult) existingResult.remove();

        const btn = card.querySelector('.card-verify-btn');
        if (btn) btn.textContent = t('btn_reverify');

        const resultDiv = document.createElement('div');
        resultDiv.className = 'verify-result';

        const scoreClass = getScoreClass(data.score);

        const scoreBar = document.createElement('div');
        scoreBar.className = 'score-section';

        const scoreLabel = document.createElement('div');
        scoreLabel.className = `score-badge ${scoreClass}`;
        scoreLabel.textContent = `${data.score}${t('score_suffix')}`;

        const scoreFill = document.createElement('div');
        scoreFill.className = 'score-bar';
        const fill = document.createElement('div');
        fill.className = `score-fill ${scoreClass}`;
        fill.style.width = `${data.score}%`;
        scoreFill.appendChild(fill);

        scoreBar.appendChild(scoreLabel);
        scoreBar.appendChild(scoreFill);
        resultDiv.appendChild(scoreBar);

        if (data.back_translation) {
            const btDiv = document.createElement('div');
            btDiv.className = 'verify-back-translation';
            const btLabel = document.createElement('span');
            btLabel.className = 'verify-label';
            btLabel.textContent = t('verify_back');
            const btText = document.createElement('span');
            btText.textContent = data.back_translation;
            btDiv.appendChild(btLabel);
            btDiv.appendChild(btText);
            resultDiv.appendChild(btDiv);
        }

        if (data.feedback_ko) {
            const fbDiv = document.createElement('div');
            fbDiv.className = 'verify-feedback';
            fbDiv.textContent = data.feedback_ko;
            resultDiv.appendChild(fbDiv);
        }

        if (data.feedback_detail) {
            const fdDiv = document.createElement('div');
            fdDiv.className = 'verify-detail';
            fdDiv.textContent = data.feedback_detail;
            resultDiv.appendChild(fdDiv);
        }

        card.appendChild(resultDiv);
    }

    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        if (ttsBtn) ttsBtn.classList.remove('playing');
        stageListenBtn.classList.remove('playing');
    }

    if (ttsBtn) ttsBtn.addEventListener('click', () => playTTS(ttsBtn));
    stageListenBtn.addEventListener('click', () => playTTS(stageListenBtn));

    async function playTTS(triggerBtn) {
        if (!lastOriginal) return;

        if (currentAudio && !currentAudio.paused) {
            stopAudio();
            return;
        }

        const cacheKey = `${lastOriginal}__${currentEmotion || ''}`;

        if (ttsCache[cacheKey]) {
            playAudioBlob(ttsCache[cacheKey], triggerBtn);
            return;
        }

        triggerBtn.disabled = true;
        triggerBtn.classList.add('loading');

        try {
            const body = { text: lastOriginal };
            if (currentEmotion) body.emotion = currentEmotion;

            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!handleApiResponse(response, 'tts')) return;
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                console.error('TTS error:', err.error || 'Unknown error');
                return;
            }

            const blob = await response.blob();
            ttsCache[cacheKey] = blob;
            playAudioBlob(blob, triggerBtn);
        } catch (err) {
            console.error('TTS error:', err);
        } finally {
            triggerBtn.disabled = false;
            triggerBtn.classList.remove('loading');
        }
    }

    function playAudioBlob(blob, triggerBtn) {
        stopAudio();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        if (triggerBtn) triggerBtn.classList.add('playing');
        currentAudio.addEventListener('ended', () => {
            if (triggerBtn) triggerBtn.classList.remove('playing');
            currentAudio = null;
            URL.revokeObjectURL(url);
        });
        currentAudio.addEventListener('error', () => {
            if (triggerBtn) triggerBtn.classList.remove('playing');
            currentAudio = null;
            URL.revokeObjectURL(url);
        });
        currentAudio.play().catch(err => {
            console.error('Audio play error:', err);
            if (triggerBtn) triggerBtn.classList.remove('playing');
        });
    }

    stageRecordBtn.addEventListener('click', toggleRecording);

    async function toggleRecording() {
        if (isRecording) {
            stopRecording();
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recordedChunks = [];
            recordedBlob = null;
            recordingPlayback.classList.add('hidden');

            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunks.push(e.data);
            };
            mediaRecorder.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                recordedBlob = new Blob(recordedChunks, { type: 'audio/webm' });
                recordingPlayback.classList.remove('hidden');
                console.log('[STT] onstop fired, lastOriginal:', lastOriginal, 'HAS_GEMINI:', HAS_GEMINI, 'blobSize:', recordedBlob?.size);
                if (lastOriginal && HAS_GEMINI) {
                    sendForSTT(recordedBlob, lastOriginal);
                } else {
                    console.warn('[STT] skipped: lastOriginal=' + !!lastOriginal + ' HAS_GEMINI=' + HAS_GEMINI);
                }
            };

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.8;
            source.connect(analyser);

            waveformWrap.classList.remove('hidden');
            waveformWrap.classList.add('active');
            startWaveformDraw();

            mediaRecorder.start();
            isRecording = true;
            stageRecordBtn.classList.add('recording');
            recordLabel.textContent = t('stage_recording');
        } catch (err) {
            console.error('Microphone access denied:', err);
            alert(t('err_mic_denied'));
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        isRecording = false;
        stageRecordBtn.classList.remove('recording');
        recordLabel.textContent = t('stage_record');

        if (waveformAnimId) {
            cancelAnimationFrame(waveformAnimId);
            waveformAnimId = null;
        }
        if (audioContext) {
            audioContext.close().catch(() => {});
            audioContext = null;
            analyser = null;
        }
        waveformWrap.classList.remove('active');
        waveformWrap.classList.add('hidden');
        const ctx = waveformCanvas.getContext('2d');
        ctx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    }

    function startWaveformDraw() {
        const canvas = waveformCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;

        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            waveformAnimId = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);

            ctx.clearRect(0, 0, w, h);

            const gradient = ctx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, '#ff2d78');
            gradient.addColorStop(0.5, '#b44dff');
            gradient.addColorStop(1, '#00d4ff');

            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;
            ctx.beginPath();

            const sliceWidth = w / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * h) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            ctx.lineTo(w, h / 2);
            ctx.stroke();
        }

        draw();
    }

    async function sendForSTT(blob, origText) {
        console.log('[STT] sendForSTT called, blob size:', blob?.size, 'origText:', origText);
        sttFeedback.classList.remove('hidden');
        sttFeedback.innerHTML = `<div class="stt-loading"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span><span class="stt-loading-text">${t('stt_analyzing')}</span></div>`;
        setTimeout(() => sttFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);

        try {
            const formData = new FormData();
            formData.append('audio', blob, 'recording.webm');
            formData.append('original_text', origText);

            const response = await fetch('/api/stt', {
                method: 'POST',
                body: formData,
            });

            if (!handleApiResponse(response, 'stt')) return;
            const data = await response.json();
            console.log('[STT] response:', data);

            if (data.success) {
                showSTTFeedback(data.score, data.recognized_text);
            } else {
                sttFeedback.innerHTML = `<div class="stt-error">${t('stt_error')}</div>`;
            }
        } catch (err) {
            console.error('[STT] fetch error:', err);
            sttFeedback.innerHTML = `<div class="stt-error">${t('stt_error')}</div>`;
        }
    }

    function showSTTFeedback(score, recognizedText) {
        const scoreClass = score >= 90 ? 'stt-high' : score >= 70 ? 'stt-mid' : 'stt-low';
        const matchText = t('stt_match').replace('{score}', score);

        let html = `<div class="stt-result ${scoreClass}">`;
        html += `<div class="stt-score-wrap"><span class="stt-score">${score}%</span></div>`;
        html += `<div class="stt-match-label">${matchText}</div>`;
        if (recognizedText) {
            html += `<div class="stt-recognized"><span class="stt-recognized-label">${t('stt_recognized')}</span><span class="stt-recognized-text">${recognizedText}</span></div>`;
        }
        html += `</div>`;

        sttFeedback.innerHTML = html;
        sttFeedback.classList.remove('hidden');
        setTimeout(() => sttFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }

    let playbackAudio = null;

    playRecordingBtn.addEventListener('click', () => {
        console.log('[PLAY] clicked, recordedBlob size:', recordedBlob?.size, 'type:', recordedBlob?.type);
        if (!recordedBlob) {
            console.warn('[PLAY] No recordedBlob available');
            return;
        }

        if (playbackAudio) {
            playbackAudio.pause();
            playbackAudio = null;
        }

        const url = URL.createObjectURL(recordedBlob);
        console.log('[PLAY] objectURL created:', url);
        playbackAudio = new Audio();
        playbackAudio.src = url;

        playbackAudio.addEventListener('loadeddata', () => {
            console.log('[PLAY] audio loaded, duration:', playbackAudio.duration);
        });
        playbackAudio.addEventListener('ended', () => {
            console.log('[PLAY] playback ended');
            URL.revokeObjectURL(url);
            playbackAudio = null;
            playRecordingBtn.textContent = t('stage_play_again');
        });
        playbackAudio.addEventListener('error', (e) => {
            console.error('[PLAY] audio error:', playbackAudio.error?.message || e);
            URL.revokeObjectURL(url);
            playbackAudio = null;
            playRecordingBtn.textContent = t('stage_play_again');
        });

        playRecordingBtn.textContent = '⏸ ...';
        playbackAudio.play().then(() => {
            console.log('[PLAY] playback started');
            playRecordingBtn.textContent = '⏸ Playing';
        }).catch(err => {
            console.error('[PLAY] play() rejected:', err.message);
            playRecordingBtn.textContent = t('stage_play_again');
        });
    });

    function renderStageHeader(s, targetEl) {
        const el = targetEl || stageHeader;
        el.innerHTML = '';
        const badge = document.createElement('span');
        badge.className = `source-badge ${s.source_type}`;
        badge.textContent = `${getSourceIcon(s)} ${sourceTypeLabel(s.source_type)} · ${getLocalizedSourceTitle(s)}`;
        el.appendChild(badge);

    }

    let currentSentenceForPractice = null;
    let _groupSentences = null;
    let _groupIndex = 0;
    let _groupLocalized = null;

    const sentenceNav = document.getElementById('sentenceNav');
    const sentNavPos = document.getElementById('sentNavPos');
    const sentPrevBtn = document.getElementById('sentPrevBtn');
    const sentNextBtn = document.getElementById('sentNextBtn');

    function _updateSentenceNav() {
        if (!_groupSentences || _groupSentences.length <= 1) {
            sentenceNav.classList.add('hidden');
            return;
        }
        sentenceNav.classList.remove('hidden');
        sentNavPos.textContent = `${_groupIndex + 1} / ${_groupSentences.length}`;
    }

    function _navigateSentence(dir) {
        if (!_groupSentences || _groupSentences.length <= 1) return;
        _groupIndex = (_groupIndex + dir + _groupSentences.length) % _groupSentences.length;
        const sentence = _groupSentences[_groupIndex];
        if (_groupLocalized) {
            sentence.localized_titles = _groupLocalized.titles;
            sentence.localized_artists = _groupLocalized.artists;
        }
        practiceWithSentence(sentence);
    }

    if (sentPrevBtn) sentPrevBtn.addEventListener('click', () => _navigateSentence(-1));
    if (sentNextBtn) sentNextBtn.addEventListener('click', () => _navigateSentence(1));

    function setGroupContext(group, startIndex) {
        _groupSentences = group ? group.sentences : null;
        _groupIndex = startIndex || 0;
        _groupLocalized = group ? { titles: group.localized_titles, artists: group.localized_artists } : null;
    }

    async function practiceWithSentence(sentence) {
        currentEmotion = sentence.emotion || null;
        currentSource = sentence;
        lastOriginal = sentence.text;
        currentSentenceForPractice = sentence;
        practiceFromCard = true;

        if (learningMode === 'hangul') {
            switchPage('practice');
            loadWordsFromSentence(sentence.text);
            sentTarget = { text: sentence.text, phonetic: '', meaning: '' };
            sentCompState = [];
            sentFromHome = true;
            fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: sentence.text, lang: getUILang() })
            }).then(r => r.json()).then(data => {
                if (data.phonetic) {
                    sentTarget.phonetic = data.phonetic;
                    wordsTargetList.forEach((w, i) => { w.phonetic = ''; });
                }
                if (data.translated) sentTarget.meaning = data.translated;
            }).catch(() => {});
            switchHangulSubTab('words');
            return;
        }

        switchPage('practice');
        switchSubTab('learn');

        learnBrowser.classList.add('hidden');
        learnContent.classList.remove('hidden');

        _updateSentenceNav();

        renderStageHeader(sentence, learnHeader);
        learnSentenceKr.textContent = sentence.text;
        learnSentenceTr.textContent = '';
        const learnPh = document.getElementById('learnSentencePh');
        if (learnPh) learnPh.textContent = '';

        grammarLoading.classList.remove('hidden');
        grammarCards.classList.add('hidden');
        grammarCards.innerHTML = '';

        fetchTranslation(sentence.text, UI_TO_PHONETIC[getUILang()] || STAGE_DEFAULT_LANG);
        loadGrammarAnalysis(sentence.text);
        loadListenView(sentence);
        loadSpeakView(sentence);
    }

    async function loadListenView(sentence) {
        listenPlaceholder.classList.add('hidden');
        listenView.classList.remove('hidden');

        renderStageHeader(sentence);
        lyricOriginal.textContent = sentence.text;
        lyricPhonetic.textContent = '';
        lyricPhonetic.removeAttribute('dir');
        lyricPhonetic.style.fontFamily = '';
        lyricLangLabel.textContent = '';
        lyricLoading.classList.remove('hidden');
        lyricPhonetic.classList.add('hidden');

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: sentence.text, language: 'all' })
            });

            const data = await response.json();
            if (data.error) return;

            stageConversions = data.conversions || {};
            dashboardData = {};

            if (Object.keys(stageConversions).length === 0) {
                lyricPhonetic.textContent = t('stage_no_result');
                lyricLangLabel.textContent = '';
                return;
            }

            for (const [key, conv] of Object.entries(stageConversions)) {
                dashboardData[key] = { flag: conv.flag, name: conv.name, phonetic: conv.phonetic, score: null };
            }

            if (HAS_GEMINI) {
                buildDashboardTable();
            }

            const uiPhoneticLang = UI_TO_PHONETIC[getUILang()] || STAGE_DEFAULT_LANG;
            renderStageLang(stageConversions, uiPhoneticLang);
            fetchTranslation(sentence.text, uiPhoneticLang);
        } catch (err) {
            console.error('Listen conversion error:', err);
            lyricPhonetic.textContent = t('stage_error');
            lyricPhonetic.classList.remove('hidden');
        } finally {
            lyricLoading.classList.add('hidden');
            lyricPhonetic.classList.remove('hidden');
        }
    }

    function loadSpeakView(sentence) {
        speakPlaceholder.classList.add('hidden');
        speakView.classList.remove('hidden');
        speakOriginal.textContent = sentence.text;
        const speakPh = document.getElementById('speakSentencePh');
        if (speakPh) speakPh.textContent = '';

        recordingPlayback.classList.add('hidden');
        sttFeedback.classList.add('hidden');
        sttFeedback.innerHTML = '';
        recordedBlob = null;
    }

    async function loadGrammarAnalysis(text) {
        grammarLoading.classList.remove('hidden');
        grammarCards.classList.add('hidden');
        grammarCards.innerHTML = '';

        try {
            const res = await fetch('/api/grammar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, lang: getUILang() })
            });
            if (!handleApiResponse(res, 'grammar')) {
                grammarLoading.classList.add('hidden');
                return;
            }
            const data = await res.json();
            if (data.error) {
                grammarLoading.classList.add('hidden');
                return;
            }
            renderGrammarCards(data);
        } catch (e) {
            console.error('Grammar analysis error:', e);
        } finally {
            grammarLoading.classList.add('hidden');
        }
    }

    function _roleColor(role) {
        if (!role) return 'default';
        const r = role.toLowerCase();
        if (r.includes('verb')) return 'verb';
        if (r.includes('noun') || r.includes('pronoun')) return 'noun';
        if (r.includes('subject')) return 'subject';
        if (r.includes('object')) return 'object';
        if (r.includes('particle') || r.includes('postposition')) return 'particle';
        if (r.includes('marker') || r.includes('ending')) return 'marker';
        if (r.includes('adjective')) return 'adjective';
        if (r.includes('adverb')) return 'adverb';
        return 'default';
    }

    const _sectionIcons = {
        grammar_words: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h12"/></svg>',
        grammar_patterns: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        grammar_pronunciation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>',
        grammar_culture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
    };

    const _flowArrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';

    function _esc(str) {
        if (typeof str !== 'string') return '';
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function renderGrammarCards(data) {
        grammarCards.innerHTML = '';

        function makeSection(iconKey, titleKey, collapsed) {
            const section = document.createElement('div');
            section.className = 'grammar-section' + (collapsed ? ' collapsed' : '');
            const titleEl = document.createElement('h4');
            titleEl.className = 'grammar-section-title';
            const iconHtml = _sectionIcons[titleKey] ? `<span class="gs-icon">${_sectionIcons[titleKey]}</span>` : '';
            titleEl.innerHTML = `${iconHtml}<span data-i18n="${titleKey}">${t(titleKey)}</span> <span class="grammar-chevron">&#9662;</span>`;
            const body = document.createElement('div');
            body.className = 'grammar-section-body';
            titleEl.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });
            section.appendChild(titleEl);
            section.appendChild(body);
            return { section, body };
        }

        if (data.words && data.words.length > 0) {
            const diagram = document.createElement('div');
            diagram.className = 'grammar-sentence-diagram';
            data.words.forEach((w, idx) => {
                const chip = document.createElement('span');
                const rc = _roleColor(w.role);
                chip.className = `gsd-word gsd-role-${rc}`;
                chip.textContent = w.word;
                chip.addEventListener('click', () => {
                    const cards = grammarCards.querySelectorAll('.grammar-word-card');
                    if (cards[idx]) cards[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
                diagram.appendChild(chip);
            });
            grammarCards.appendChild(diagram);

            const { section, body } = makeSection('grammar_words', 'grammar_words', false);
            data.words.forEach(w => {
                const rc = _roleColor(w.role);
                const card = document.createElement('div');
                card.className = 'grammar-word-card';
                card.setAttribute('data-role-color', rc);
                card.innerHTML = `
                    <div class="gw-header">
                        <div class="gw-flow">
                            <span class="gw-root">${_esc(w.root)}</span>
                            <span class="gw-flow-arrow">${_flowArrowSvg}</span>
                            <span class="gw-word">${_esc(w.word)}</span>
                        </div>
                        <span class="gw-role-badge" data-role-color="${rc}">${_esc(w.role)}</span>
                    </div>
                    <div class="gw-meaning-bar"><span class="gw-meaning-icon">&#9679;</span> ${_esc(w.root_meaning)}</div>
                    <div class="gw-explain">${_esc(w.explanation)}</div>`;
                body.appendChild(card);
            });
            grammarCards.appendChild(section);
        }

        if (data.grammar_patterns && data.grammar_patterns.length > 0) {
            const { section, body } = makeSection('grammar_patterns', 'grammar_patterns', false);
            data.grammar_patterns.forEach(p => {
                const card = document.createElement('div');
                card.className = 'grammar-pattern-card';
                let examplesHtml = '';
                if (p.examples && p.examples.length > 0) {
                    examplesHtml = `<div class="gp-examples">${p.examples.map((e, i) => `<div class="gp-example"><span class="gp-example-num">${i + 1}</span><span>${_esc(e)}</span></div>`).join('')}</div>`;
                }
                card.innerHTML = `
                    <div class="gp-formula-bar">${_esc(p.pattern)}</div>
                    <div class="gp-body">
                        <div class="gp-meaning">${_esc(p.meaning)}</div>
                        <div class="gp-comparison">${_esc(p.user_lang_comparison)}</div>
                        ${examplesHtml}
                    </div>`;
                body.appendChild(card);
            });
            grammarCards.appendChild(section);
        }

        if (data.pronunciation_tips && data.pronunciation_tips.length > 0) {
            const { section, body } = makeSection('grammar_pronunciation', 'grammar_pronunciation', false);
            data.pronunciation_tips.forEach(p => {
                const card = document.createElement('div');
                card.className = 'grammar-pronun-card';
                const pText = typeof p.text === 'string' ? p.text : '';
                const parts = pText.split(/\s*[→>]\s*/);
                let flowHtml = '';
                if (parts.length >= 2) {
                    flowHtml = `<div class="gpr-flow"><span class="gpr-from">${_esc(parts[0])}</span><span class="gpr-arrow">${_flowArrowSvg}</span><span class="gpr-to">${_esc(parts[parts.length - 1])}</span></div>`;
                } else {
                    flowHtml = `<div class="gpr-flow"><span class="gpr-from">${_esc(pText)}</span></div>`;
                }
                card.innerHTML = `
                    ${flowHtml}
                    <span class="gpr-rule-badge">${_esc(p.rule)}</span>
                    <div class="gpr-explain">${_esc(p.explanation)}</div>`;
                body.appendChild(card);
            });
            grammarCards.appendChild(section);
        }

        if (data.cultural_note) {
            const { section, body } = makeSection('grammar_culture', 'grammar_culture', false);
            body.innerHTML = `<div class="grammar-culture-card"><p class="gc-note">${_esc(data.cultural_note)}</p></div>`;
            grammarCards.appendChild(section);
        }

        grammarCards.classList.remove('hidden');
    }

    function renderStageLang(conversions, langKey) {
        const conv = conversions[langKey] || Object.values(conversions)[0];
        const key = conversions[langKey] ? langKey : Object.keys(conversions)[0];
        if (!conv) return;

        lyricPhonetic.textContent = conv.phonetic;
        lyricLangLabel.textContent = '';

        lyricPhonetic.removeAttribute('dir');
        lyricPhonetic.style.fontFamily = '';
        if (RTL_LANGUAGES.includes(key)) {
            lyricPhonetic.setAttribute('dir', 'rtl');
        }
        if (SCRIPT_FONTS[key]) {
            lyricPhonetic.style.fontFamily = SCRIPT_FONTS[key];
        }

        const learnPh = document.getElementById('learnSentencePh');
        if (learnPh) learnPh.textContent = conv.phonetic;
        const speakPh = document.getElementById('speakSentencePh');
        if (speakPh) speakPh.textContent = conv.phonetic;
    }

    async function fetchTranslation(text, targetLang) {
        const uiLang = getUILang();
        if (uiLang === 'ko') {
            if (lyricLangLabel) lyricLangLabel.textContent = '';
            if (learnSentenceTr) learnSentenceTr.textContent = '';
            return;
        }

        const cacheKey = text + '|' + targetLang;
        if (translationCache[cacheKey]) {
            if (lyricLangLabel) lyricLangLabel.textContent = translationCache[cacheKey];
            if (learnSentenceTr && lastOriginal === text) learnSentenceTr.textContent = translationCache[cacheKey];
            return;
        }

        if (lyricLangLabel) lyricLangLabel.textContent = '...';

        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text, target_lang: targetLang })
            });
            if (!handleApiResponse(res, 'translate')) return;
            const data = await res.json();
            if (data.translation && lastOriginal === text) {
                translationCache[cacheKey] = data.translation;
                if (lyricLangLabel) lyricLangLabel.textContent = data.translation;
                if (learnSentenceTr) learnSentenceTr.textContent = data.translation;
            } else if (lastOriginal === text) {
                if (lyricLangLabel) lyricLangLabel.textContent = '';
            }
        } catch (err) {
            if (lastOriginal === text && lyricLangLabel) {
                lyricLangLabel.textContent = '';
            }
        }
    }

    let categoriesCache = [];

    async function loadSentences() {
        try {
            const url = selectedCategory === '__all__'
                ? '/api/sentences'
                : `/api/sentences?category=${encodeURIComponent(selectedCategory)}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.categories && data.categories.length > 0) {
                categoriesCache = data.categories;
            }
            buildCategoryChips(categoriesCache);
            renderSentences(data.sentences || []);
        } catch (err) {
            console.error('Failed to load sentences:', err);
        }
    }

    function buildCategoryChips(categories) {
        categoryChips.innerHTML = '';
        const allChip = document.createElement('button');
        allChip.className = `category-chip ${selectedCategory === '__all__' ? 'active' : ''}`;
        allChip.textContent = t('all');
        allChip.addEventListener('click', () => selectCategory('__all__'));
        categoryChips.appendChild(allChip);

        categories.forEach(cat => {
            const chip = document.createElement('button');
            chip.className = `category-chip ${selectedCategory === cat ? 'active' : ''}`;
            chip.textContent = tCategory(cat);
            chip.addEventListener('click', () => selectCategory(cat));
            categoryChips.appendChild(chip);
        });
    }

    async function selectCategory(cat) {
        selectedCategory = cat;
        await loadSentences();
    }

    function renderSentences(sentences) {
        sentencesList.innerHTML = '';
        sentences.forEach(s => {
            const card = document.createElement('div');
            card.className = 'sentence-card';

            const textDiv = document.createElement('div');
            textDiv.className = 'sentence-text';
            textDiv.textContent = s.text;

            const meta = document.createElement('div');
            meta.className = 'sentence-meta';

            const srcBadge = document.createElement('span');
            srcBadge.className = `source-badge ${s.source_type}`;
            srcBadge.textContent = `${getSourceIcon(s)} ${sourceTypeLabel(s.source_type)} · ${getLocalizedSourceTitle(s)}`;
            meta.appendChild(srcBadge);

            const practiceBtn = document.createElement('button');
            practiceBtn.className = 'sentence-practice-btn';
            practiceBtn.textContent = t('practice_this');
            practiceBtn.addEventListener('click', () => {
                setGroupContext(null, 0);
                practiceWithSentence(s);
            });

            card.appendChild(textDiv);
            card.appendChild(meta);
            card.appendChild(practiceBtn);
            sentencesList.appendChild(card);
        });
    }

    randomBtn.addEventListener('click', async () => {
        try {
            const url = selectedCategory === '__all__'
                ? '/api/sentences/random'
                : `/api/sentences/random?category=${encodeURIComponent(selectedCategory)}`;
            const response = await fetch(url);
            if (!response.ok) return;
            const sentence = await response.json();
            if (sentence.error) return;
            setGroupContext(null, 0);
            practiceWithSentence(sentence);
        } catch (err) {
            console.error(err);
        }
    });

    async function loadHomeData() {
        if (homeContent) homeContent.innerHTML = '<div style="padding:24px;color:var(--text-secondary);text-align:center;font-size:0.9rem;">Loading...</div>';
        try {
            const response = await fetch('/api/sentences/grouped', {cache: 'no-store'});
            const data = await response.json();
            if (!data || data.error || (!data.kpop && !data.drama && !data.trending)) {
                throw new Error('Invalid data from API: ' + JSON.stringify(data));
            }
            homeGroupedData = data;
            homeDataLoaded = true;
            renderHome(data);
        } catch (err) {
            console.error('Failed to load home data:', err);
            if (homeContent) homeContent.innerHTML = '<div style="padding:24px;color:var(--text-secondary);text-align:center;font-size:0.9rem;">Content could not be loaded. Please refresh.</div>';
        }
    }

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function createShuffleToggle() {
        const wrap = document.createElement('div');
        wrap.className = 'shuffle-toggle-wrap';

        const btn = document.createElement('button');
        btn.className = 'shuffle-toggle-btn' + (shuffleEnabled ? ' active' : '');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>';
        btn.title = shuffleEnabled ? t('shuffle_on') : t('shuffle_off');

        btn.addEventListener('click', () => {
            shuffleEnabled = !shuffleEnabled;
            localStorage.setItem('kvoice_shuffle', shuffleEnabled ? 'true' : 'false');
            btn.classList.toggle('active', shuffleEnabled);
            btn.title = shuffleEnabled ? t('shuffle_on') : t('shuffle_off');
            if (homeGroupedData) renderHome(homeGroupedData);
        });

        wrap.appendChild(btn);
        return wrap;
    }

    function createPlusCard(sourceType, row) {
        const card = document.createElement('div');
        card.className = 'album-card plus-card';

        const art = document.createElement('div');
        art.className = 'album-art plus-card-art';
        art.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

        const label = document.createElement('div');
        label.className = 'album-title plus-card-label';
        label.textContent = t('generate_more');

        card.appendChild(art);
        card.appendChild(label);

        card.addEventListener('click', async () => {
            if (card.classList.contains('loading')) return;
            card.classList.add('loading');
            art.innerHTML = '<div class="plus-card-spinner"></div>';
            label.textContent = t('generating');

            try {
                const seenIds = generatedCardIds[sourceType] || [];
                const resp = await fetch('/api/sentences/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ source_type: sourceType, seen_ids: seenIds })
                });

                if (resp.status === 429) {
                    card.classList.remove('loading');
                    showEnergyPopup();
                    return;
                }

                const result = await resp.json();
                if (result.error) throw new Error(result.error);

                if (result.id) generatedCardIds[sourceType].push(result.id);

                const newGroup = {
                    source_type: sourceType,
                    source_title: result.source_title,
                    sentences: result.sentences.map((s, i) => ({
                        id: `gen_${result.id}_${i}`,
                        text: s.text,
                        source_type: sourceType,
                        source_title: result.source_title,
                        emotion: s.emotion,
                        category: s.category || 'daily'
                    })),
                    localized_titles: result.localized_titles,
                    localized_artists: result.localized_artists,
                    card_image: result.card_image
                };

                const gradientIdx = row.children.length - 1;
                const newCard = createAlbumCard(newGroup, gradientIdx);
                newCard.classList.add('card-appear');
                row.insertBefore(newCard, card);

                art.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
                label.textContent = t('generate_more');
                card.classList.remove('loading');

                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 100);
            } catch (err) {
                console.error('Generate error:', err);
                label.textContent = t('generate_error');
                art.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
                card.classList.remove('loading');
                setTimeout(() => { label.textContent = t('generate_more'); }, 2000);
            }
        });

        return card;
    }

    function renderHomeSection(groups, titleKey, iconSvg, sourceType, offset, extraEl) {
        if (!groups || groups.length === 0) return null;

        const section = document.createElement('div');
        section.className = 'home-section';

        const titleRow = document.createElement('div');
        titleRow.className = 'home-section-header';

        const title = document.createElement('h2');
        title.className = 'home-section-title';
        title.innerHTML = iconSvg + t(titleKey);
        titleRow.appendChild(title);
        if (extraEl) titleRow.appendChild(extraEl);

        section.appendChild(titleRow);

        const row = document.createElement('div');
        row.className = 'home-scroll-row';

        const ordered = shuffleEnabled ? shuffleArray(groups) : groups;
        ordered.forEach((group, idx) => {
            row.appendChild(createAlbumCard(group, idx + offset));
        });

        if (HAS_GEMINI) row.appendChild(createPlusCard(sourceType, row));

        section.appendChild(row);
        return section;
    }

    function renderHome(data) {
        homeContent.innerHTML = '';

        const shuffleToggle = createShuffleToggle();

        const kpopIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;opacity:0.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
        const dramaIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;opacity:0.6"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>';
        const trendIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px;opacity:0.6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';

        const kpopSection = renderHomeSection(data.kpop, 'home_kpop_title', kpopIcon, 'kpop', 0, shuffleToggle);
        if (kpopSection) homeContent.appendChild(kpopSection);

        const dramaSection = renderHomeSection(data.drama, 'home_drama_title', dramaIcon, 'drama', (data.kpop ? data.kpop.length : 0));
        if (dramaSection) homeContent.appendChild(dramaSection);

        const trendSection = renderHomeSection(data.trending, 'home_trending_title', trendIcon, 'trending',
            (data.kpop ? data.kpop.length : 0) + (data.drama ? data.drama.length : 0));
        if (trendSection) homeContent.appendChild(trendSection);
    }

    function getLocalizedTitle(group) {
        const lang = getUILang();
        if (group.localized_titles && group.localized_titles[lang]) {
            return group.localized_titles[lang];
        }
        if (group.localized_titles && group.localized_titles['en']) {
            return group.localized_titles['en'];
        }
        return group.source_title;
    }

    function getLocalizedArtist(group) {
        const lang = getUILang();
        if (group.localized_artists && group.localized_artists[lang]) {
            return group.localized_artists[lang];
        }
        if (group.localized_artists && group.localized_artists['en']) {
            return group.localized_artists['en'];
        }
        return group.source_artist || '';
    }

    function createAlbumCard(group, idx) {
        const card = document.createElement('div');
        card.className = 'album-card';

        const art = document.createElement('div');
        art.className = 'album-art';

        if (group.card_image) {
            const img = document.createElement('img');
            img.className = 'album-art-img';
            img.src = `/static/images/cards/${group.card_image}?v=21`;
            img.alt = getLocalizedTitle(group);
            img.loading = 'lazy';
            img.onerror = function() {
                this.style.display = 'none';
                art.style.background = ALBUM_GRADIENTS[idx % ALBUM_GRADIENTS.length];
                art.innerHTML += group.source_type === 'kpop' ? KPOP_ICON_SVG : group.source_type === 'trending' ? TRENDING_ICON_SVG : DRAMA_ICON_SVG;
            };
            art.appendChild(img);
        } else {
            art.style.background = ALBUM_GRADIENTS[idx % ALBUM_GRADIENTS.length];
            art.innerHTML = group.source_type === 'kpop' ? KPOP_ICON_SVG : DRAMA_ICON_SVG;
        }

        const count = document.createElement('span');
        count.className = 'art-count';
        count.textContent = `${group.sentences.length} ${t('sentences_count')}`;
        art.appendChild(count);

        const titleEl = document.createElement('div');
        titleEl.className = 'album-title';

        const artistEl = document.createElement('div');
        artistEl.className = 'album-artist';

        titleEl.textContent = getLocalizedTitle(group);
        artistEl.textContent = getLocalizedArtist(group) || (group.source_type === 'drama' ? t('drama_label') : group.source_type === 'trending' ? t('trending_label') : '');

        card.appendChild(art);
        card.appendChild(titleEl);
        card.appendChild(artistEl);

        card.addEventListener('click', () => {
            const sentence = group.sentences[0];
            if (sentence) {
                sentence.localized_titles = group.localized_titles;
                sentence.localized_artists = group.localized_artists;
                setGroupContext(group, 0);
                practiceWithSentence(sentence);
            }
        });

        return card;
    }

    const learningModeToggle = document.getElementById('learningModeToggle');
    const lmLabelHangul = document.getElementById('lmLabelHangul');
    const lmLabelKorean = document.getElementById('lmLabelKorean');
    const koreanSubTabBar = document.getElementById('koreanSubTabBar');
    const hangulSubTabBar = document.getElementById('hangulSubTabBar');
    const hangulLettersPanel = document.getElementById('hangulLettersPanel');
    const hangulWordsPanel = document.getElementById('hangulWordsPanel');
    const hangulSentencesPanel = document.getElementById('hangulSentencesPanel');
    const hangulSubTabBtns = document.querySelectorAll('.hangul-sub-tab-btn');
    const hangulCatBtns = document.querySelectorAll('.hangul-cat-btn');
    const jamoCardsContainer = document.getElementById('jamoCardsContainer');

    const talkbotActiveScreen = document.getElementById('talkbotActiveScreen');
    const talkStarAvatar = document.getElementById('talkStarAvatar');
    const talkStarName = document.getElementById('talkStarName');
    const talkStarGroup = document.getElementById('talkStarGroup');
    const talkChangeStar = document.getElementById('talkChangeStar');
    const talkMessages = document.getElementById('talkMessages');
    const talkMicBtn = document.getElementById('talkMicBtn');
    const talkMicLabel = document.getElementById('talkMicLabel');
    const talkWaveformWrap = document.getElementById('talkWaveformWrap');
    const talkWaveformCanvas = document.getElementById('talkWaveformCanvas');

    const navLabBtn = document.querySelector('.nav-btn[data-page="lab"]');
    const navLabLabel = navLabBtn ? navLabBtn.querySelector('.nav-label') : null;

    let learningMode = localStorage.getItem('kvoice_learning_mode') || 'hangul';
    let compositionState = [];
    let talkHistory = [];
    let talkRecording = false;
    let talkMediaRecorder = null;
    let talkRecordedChunks = [];
    let talkAudioContext = null;
    let talkAnalyser = null;
    let talkWaveformAnimId = null;
    let talkSending = false;
    let currentTalkAudio = null;

    function setLearningMode(mode) {
        learningMode = mode;
        localStorage.setItem('kvoice_learning_mode', mode);
        learningModeToggle.dataset.mode = mode;

        if (mode === 'hangul') {
            lmLabelHangul.classList.add('active');
            lmLabelKorean.classList.remove('active');
        } else {
            lmLabelHangul.classList.remove('active');
            lmLabelKorean.classList.add('active');
        }

        updatePracticeView();
        updateLabView();
        updateNavLabLabel();
    }

    function updateNavLabLabel() {
        if (!navLabLabel) return;
        if (learningMode === 'korean') {
            navLabLabel.textContent = t('nav_lab_talk');
        } else {
            navLabLabel.textContent = t('nav_lab');
        }
    }

    let lastKoreanSubTab = 'learn';

    function updatePracticeView() {
        if (!koreanSubTabBar || !hangulSubTabBar) return;

        if (!practiceFromCard) {
            learnContent.classList.add('hidden');
            learnBrowser.classList.remove('hidden');
            currentSentenceForPractice = null;
            setGroupContext(null, 0);

            wordsSentenceSource = null;
            sentFromHome = false;
            wordsTargetList = [];
            wordsCurrentIndex = 0;
            wordsCompState = [];
            wordsCompleted = new Set();
            sentTarget = null;
            sentCompState = [];
        }

        if (learningMode === 'hangul') {
            const activeKor = document.querySelector('.sub-tab-btn.active');
            if (activeKor) lastKoreanSubTab = activeKor.dataset.subtab;

            koreanSubTabBar.classList.add('hidden');
            learnSubTab.classList.add('hidden');
            listenSubTab.classList.add('hidden');
            speakSubTab.classList.add('hidden');

            hangulSubTabBar.classList.remove('hidden');
            switchHangulSubTab(getActiveHangulSubTab());
        } else {
            hangulSubTabBar.classList.add('hidden');
            hangulLettersPanel.classList.add('hidden');
            hangulWordsPanel.classList.add('hidden');
            hangulSentencesPanel.classList.add('hidden');

            koreanSubTabBar.classList.remove('hidden');
            switchSubTab(lastKoreanSubTab);
        }
    }

    function updateLabView() {
        if (!starSelectScreen || !chatActiveScreen || !talkbotActiveScreen) return;

        const histScreen = document.getElementById('chatHistoryScreen');
        if (histScreen) histScreen.classList.add('hidden');
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');

        if (currentStarId || currentCustomName) {
            starSelectScreen.classList.add('hidden');
            if (learningMode === 'korean') {
                chatActiveScreen.classList.add('hidden');
                talkbotActiveScreen.classList.remove('hidden');
            } else {
                talkbotActiveScreen.classList.add('hidden');
                chatActiveScreen.classList.remove('hidden');
            }
        } else {
            chatActiveScreen.classList.add('hidden');
            talkbotActiveScreen.classList.add('hidden');
            starSelectScreen.classList.remove('hidden');
        }
    }

    let lettersCurrentIndex = 0;
    let lettersListMode = false;
    let jamoProgress = new Set(JSON.parse(localStorage.getItem('kvoice_jamo_progress') || '[]'));

    let wordsCompState = [];
    let wordsShiftActive = false;
    let wordsTargetList = [];
    let wordsCurrentIndex = 0;
    let wordsSentenceSource = null;
    let wordsCompleted = new Set();
    let wordsAdvancing = false;

    let sentCompState = [];
    let sentShiftActive = false;
    let sentTarget = null;
    let sentFromHome = false;

    const DEFAULT_SENTENCES = [
        { text: '안녕하세요', phonetic: 'annyeonghaseyo', meaning: 'Hello' },
        { text: '감사합니다', phonetic: 'gamsahamnida', meaning: 'Thank you' },
        { text: '사랑해요', phonetic: 'saranghaeyo', meaning: 'I love you' },
        { text: '좋은 하루 되세요', phonetic: 'joheun haru doeseyo', meaning: 'Have a nice day' },
        { text: '만나서 반갑습니다', phonetic: 'mannaseo bangapseumnida', meaning: 'Nice to meet you' },
        { text: '잘 먹겠습니다', phonetic: 'jal meokgetseumnida', meaning: 'I will eat well' },
        { text: '어디에 가요', phonetic: 'eodie gayo', meaning: 'Where are you going?' },
        { text: '이름이 뭐예요', phonetic: 'ireumi mwoyeyo', meaning: 'What is your name?' },
        { text: '한국어 공부해요', phonetic: 'hangugeo gongbuhaeyo', meaning: 'I study Korean' },
        { text: '오늘 날씨가 좋아요', phonetic: 'oneul nalssiga joayo', meaning: 'The weather is nice today' },
        { text: '커피 한 잔 주세요', phonetic: 'keopi han jan juseyo', meaning: 'One cup of coffee please' },
        { text: '다음에 또 만나요', phonetic: 'daeume tto mannayo', meaning: 'Let\'s meet again next time' },
        { text: '생일 축하합니다', phonetic: 'saengil chukahamnida', meaning: 'Happy birthday' },
        { text: '잠깐만 기다려 주세요', phonetic: 'jamkkanman gidaryeo juseyo', meaning: 'Please wait a moment' },
        { text: '정말 맛있어요', phonetic: 'jeongmal masiteoyo', meaning: 'It\'s really delicious' }
    ];

    function getActiveHangulSubTab() {
        const active = document.querySelector('.hangul-sub-tab-btn.active');
        return active ? active.dataset.hsubtab : 'letters';
    }

    function switchHangulSubTab(tab) {
        hangulSubTabBtns.forEach(b => b.classList.remove('active'));
        hangulSubTabBtns.forEach(b => { if (b.dataset.hsubtab === tab) b.classList.add('active'); });

        hangulLettersPanel.classList.add('hidden');
        hangulWordsPanel.classList.add('hidden');
        hangulSentencesPanel.classList.add('hidden');

        if (tab === 'letters') {
            hangulLettersPanel.classList.remove('hidden');
            renderLetterLesson();
        } else if (tab === 'words') {
            hangulWordsPanel.classList.remove('hidden');
            initWordsPanel();
        } else if (tab === 'sentences') {
            hangulSentencesPanel.classList.remove('hidden');
            initSentencesPanel();
        }
    }

    hangulSubTabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchHangulSubTab(btn.dataset.hsubtab));
    });

    learningModeToggle.addEventListener('click', () => {
        setLearningMode(learningMode === 'hangul' ? 'korean' : 'hangul');
    });

    function getActiveJamoCat() {
        const active = document.querySelector('.hangul-cat-btn.active');
        return active ? active.dataset.cat : 'consonants';
    }

    function getJamoData(cat) {
        switch (cat) {
            case 'consonants': return HANGUL.BASIC_CONSONANTS;
            case 'vowels': return HANGUL.BASIC_VOWELS;
            case 'double': return HANGUL.DOUBLE_CONSONANTS;
            case 'complex': return HANGUL.COMPLEX_VOWELS;
            default: return HANGUL.BASIC_CONSONANTS;
        }
    }

    hangulCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            hangulCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            lettersCurrentIndex = 0;
            if (lettersListMode) {
                renderJamoCards(btn.dataset.cat);
            } else {
                renderLetterLesson();
            }
        });
    });

    function saveJamoProgress() {
        localStorage.setItem('kvoice_jamo_progress', JSON.stringify([...jamoProgress]));
    }

    function renderLetterLesson() {
        const cat = getActiveJamoCat();
        const data = getJamoData(cat);
        if (data.length === 0) return;

        const idx = Math.min(lettersCurrentIndex, data.length - 1);
        lettersCurrentIndex = idx;
        const j = data[idx];
        const lang = getUILang();

        document.getElementById('letterCharBig').textContent = j.char;
        document.getElementById('letterName').textContent = j.name;
        document.getElementById('letterRoman').textContent = `[${j.roman}] — ${j.sound}`;

        const desc = (typeof JAMO_DESCRIPTIONS !== 'undefined' && JAMO_DESCRIPTIONS[lang] && JAMO_DESCRIPTIONS[lang][j.char]) ? JAMO_DESCRIPTIONS[lang][j.char] : null;
        document.getElementById('letterCompare').textContent = desc ? desc.compare : '';
        document.getElementById('letterTip').textContent = desc ? desc.tip : '';
        document.getElementById('letterExample').innerHTML = `<span class="jamo-example-kr">${j.example}</span> <span class="jamo-example-meaning">${j.exampleMeaning}</span>`;

        document.getElementById('letterCounter').textContent = `${idx + 1} / ${data.length}`;

        const pct = data.length > 0 ? Math.round((data.filter(d => jamoProgress.has(d.char)).length / data.length) * 100) : 0;
        document.getElementById('lettersProgressText').textContent = `${pct}%`;
        document.getElementById('lettersProgressFill').style.width = pct + '%';

        document.getElementById('letterKeyResult').classList.add('hidden');

        renderLetterKeyboard(j.char);
    }

    function findQkeyForJamo(targetChar) {
        for (const qkey in HANGUL.KEYBOARD_MAP) {
            if (HANGUL.KEYBOARD_MAP[qkey] === targetChar) return { qkey, shift: false };
        }
        for (const qkey in HANGUL.KEYBOARD_SHIFT_MAP) {
            if (HANGUL.KEYBOARD_SHIFT_MAP[qkey] === targetChar) return { qkey, shift: true };
        }
        return null;
    }

    function renderLetterKeyboard(highlightChar) {
        const container = document.getElementById('letterKeyboard');
        container.innerHTML = '';
        const targetKey = findQkeyForJamo(highlightChar);

        HANGUL.KEYBOARD_ROWS.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'hangul-kb-row';

            row.forEach(qkey => {
                const needShift = targetKey && targetKey.shift;
                const hangulChar = (needShift && HANGUL.KEYBOARD_SHIFT_MAP[qkey]) ? HANGUL.KEYBOARD_SHIFT_MAP[qkey] : HANGUL.KEYBOARD_MAP[qkey];
                if (!hangulChar) return;

                const keyEl = document.createElement('button');
                keyEl.className = 'hangul-kb-key';
                const isTarget = hangulChar === highlightChar;
                if (isTarget) keyEl.classList.add('letter-key-highlight');
                else keyEl.classList.add('letter-key-dim');

                const labelMap = HANGUL.KEYBOARD_LABELS[getUILang()] || HANGUL.KEYBOARD_LABELS['en'];
                const localLabel = labelMap[qkey] || qkey.toUpperCase();
                keyEl.innerHTML = `<span class="hangul-kb-key-hangul">${hangulChar}</span><span class="hangul-kb-key-qwerty">${localLabel}</span>`;

                keyEl.addEventListener('click', () => {
                    if (hangulChar === highlightChar) {
                        playJamoSound(hangulChar);
                        document.getElementById('letterKeyResult').classList.remove('hidden');
                        jamoProgress.add(highlightChar);
                        saveJamoProgress();
                        renderLetterLesson();
                    } else {
                        keyEl.classList.add('letter-key-wrong');
                        setTimeout(() => keyEl.classList.remove('letter-key-wrong'), 400);
                    }
                });

                rowEl.appendChild(keyEl);
            });
            container.appendChild(rowEl);
        });
    }

    document.getElementById('letterListenBtn').addEventListener('click', () => {
        const cat = getActiveJamoCat();
        const data = getJamoData(cat);
        if (data[lettersCurrentIndex]) playJamoSound(data[lettersCurrentIndex].char);
    });

    document.getElementById('letterPrevBtn').addEventListener('click', () => {
        if (lettersCurrentIndex > 0) { lettersCurrentIndex--; renderLetterLesson(); }
    });

    document.getElementById('letterNextBtn').addEventListener('click', () => {
        const data = getJamoData(getActiveJamoCat());
        if (lettersCurrentIndex < data.length - 1) { lettersCurrentIndex++; renderLetterLesson(); }
    });

    document.getElementById('lettersViewToggle').addEventListener('click', () => {
        lettersListMode = !lettersListMode;
        const btn = document.getElementById('lettersViewToggle');
        if (lettersListMode) {
            document.getElementById('letterLessonView').classList.add('hidden');
            document.getElementById('lettersListView').classList.remove('hidden');
            document.getElementById('lettersProgressBar').classList.add('hidden');
            btn.textContent = t('letters_view_lesson');
            renderJamoCards(getActiveJamoCat());
        } else {
            document.getElementById('letterLessonView').classList.remove('hidden');
            document.getElementById('lettersListView').classList.add('hidden');
            document.getElementById('lettersProgressBar').classList.remove('hidden');
            btn.textContent = t('letters_view_list');
            renderLetterLesson();
        }
    });

    function renderJamoCards(cat) {
        const data = getJamoData(cat);
        jamoCardsContainer.innerHTML = '';

        data.forEach((j, idx) => {
            const card = document.createElement('div');
            card.className = 'jamo-card';
            if (jamoProgress.has(j.char)) card.classList.add('jamo-card-mastered');

            card.innerHTML = `
                <div class="jamo-char">${j.char}</div>
                <div class="jamo-name">${j.name}</div>
                <div class="jamo-roman">[${j.roman}] — ${j.sound}</div>
                <div class="jamo-example">
                    <span class="jamo-example-kr">${j.example}</span>
                    <span class="jamo-example-meaning">${j.exampleMeaning}</span>
                </div>
                ${jamoProgress.has(j.char) ? '<div class="jamo-mastered-badge">✓</div>' : ''}
            `;

            card.addEventListener('click', () => {
                lettersListMode = false;
                lettersCurrentIndex = idx;
                document.getElementById('letterLessonView').classList.remove('hidden');
                document.getElementById('lettersListView').classList.add('hidden');
                document.getElementById('lettersProgressBar').classList.remove('hidden');
                document.getElementById('lettersViewToggle').textContent = t('letters_view_list');
                renderLetterLesson();
            });

            const listenBtn = document.createElement('button');
            listenBtn.className = 'jamo-listen-btn';
            listenBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg> ' + j.char;
            listenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playJamoSound(j.char);
            });
            card.appendChild(listenBtn);

            jamoCardsContainer.appendChild(card);
        });
    }

    function renderHangulKeyboard(container, shiftActive, onKeyPress, highlightChar) {
        container.innerHTML = '';

        HANGUL.KEYBOARD_ROWS.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'hangul-kb-row';

            row.forEach(qkey => {
                const hangulChar = (shiftActive && HANGUL.KEYBOARD_SHIFT_MAP[qkey]) ? HANGUL.KEYBOARD_SHIFT_MAP[qkey] : HANGUL.KEYBOARD_MAP[qkey];
                if (!hangulChar) return;

                const keyEl = document.createElement('button');
                keyEl.className = 'hangul-kb-key';
                if (highlightChar && hangulChar === highlightChar) {
                    keyEl.classList.add('letter-key-highlight');
                }
                const labelMap = HANGUL.KEYBOARD_LABELS[getUILang()] || HANGUL.KEYBOARD_LABELS['en'];
                const localLabel = labelMap[qkey] || qkey.toUpperCase();
                keyEl.innerHTML = `<span class="hangul-kb-key-hangul">${hangulChar}</span><span class="hangul-kb-key-qwerty">${localLabel}</span>`;

                keyEl.addEventListener('click', () => {
                    if (onKeyPress) onKeyPress(hangulChar);
                });

                rowEl.appendChild(keyEl);
            });
            container.appendChild(rowEl);
        });
    }

    function initWordsPanel() {
        const kb = document.getElementById('wordsKeyboard');
        renderHangulKeyboard(kb, wordsShiftActive, (ch) => {
            wordsCompState.push(ch);
            updateWordsOutput();
        });

        if (wordsTargetList.length === 0 && !wordsSentenceSource) {
            const data = getJamoData('consonants');
            wordsTargetList = data.map(j => ({ word: j.example, phonetic: j.exampleRoman || j.roman, meaning: j.exampleMeaning }));
            wordsCurrentIndex = 0;
            wordsCompleted = new Set();

            const uiLang = getUILang();
            if (uiLang !== 'en') {
                wordsTargetList.forEach((wObj, i) => {
                    fetch('/api/hangul/meaning', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: wObj.word, lang: uiLang })
                    }).then(r => {
                        if (r.status === 429) { showEnergyPopup(); return null; }
                        return r.json();
                    }).then(data => {
                        if (data && data.has_meaning) {
                            wordsTargetList[i].meaning = data.meaning;
                            if (i === wordsCurrentIndex) renderWordsTarget();
                        }
                    }).catch(() => {});
                });
            }
        }

        renderWordsChipBar();
        renderWordsTarget();
        updateWordsOutput();

        if (wordsSentenceSource) {
            const hdr = document.getElementById('wordsSourceHeader');
            hdr.classList.remove('hidden');
            hdr.textContent = wordsSentenceSource;
        } else {
            document.getElementById('wordsSourceHeader').classList.add('hidden');
        }
    }

    let lastWordsCat = 'consonants';
    const WORDS_CATS = ['consonants', 'vowels', 'double', 'complex'];

    document.getElementById('wordsShuffleBtn').addEventListener('click', () => {
        wordsSentenceSource = null;
        sentFromHome = false;
        const catIdx = WORDS_CATS.indexOf(lastWordsCat);
        lastWordsCat = WORDS_CATS[(catIdx + 1) % WORDS_CATS.length];
        const data = getJamoData(lastWordsCat);
        wordsTargetList = data.map(j => ({ word: j.example, phonetic: j.exampleRoman || j.roman, meaning: j.exampleMeaning }));
        wordsCurrentIndex = 0;
        wordsCompState = [];
        wordsCompleted = new Set();
        document.getElementById('wordsMatchResult').classList.add('hidden');

        const uiLang = getUILang();
        if (uiLang !== 'en') {
            wordsTargetList.forEach((wObj, i) => {
                fetch('/api/hangul/meaning', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: wObj.word, lang: uiLang })
                }).then(r => {
                    if (r.status === 429) { showEnergyPopup(); return null; }
                    return r.json();
                }).then(data => {
                    if (data && data.has_meaning) {
                        wordsTargetList[i].meaning = data.meaning;
                        if (i === wordsCurrentIndex) renderWordsTarget();
                    }
                }).catch(() => {});
            });
        }

        document.getElementById('wordsSourceHeader').classList.add('hidden');
        renderWordsChipBar();
        renderWordsTarget();
        updateWordsOutput();
    });

    function renderWordsChipBar() {
        const bar = document.getElementById('wordsChipBar');
        bar.innerHTML = '';
        wordsTargetList.forEach((w, i) => {
            const chip = document.createElement('button');
            let cls = 'word-chip';
            if (i === wordsCurrentIndex) cls += ' word-chip-active';
            if (wordsCompleted.has(i)) cls += ' word-chip-done';
            chip.className = cls;
            chip.textContent = w.word;
            chip.addEventListener('click', () => {
                wordsCurrentIndex = i;
                wordsCompState = [];
                document.getElementById('wordsMatchResult').classList.add('hidden');
                renderWordsChipBar();
                renderWordsTarget();
                updateWordsOutput();
            });
            bar.appendChild(chip);
        });
    }

    const DECOMPOSE_COMPOUND_JUNGSUNG = {};
    if (HANGUL.COMPOUND_JUNGSUNG) {
        for (const [pair, compound] of Object.entries(HANGUL.COMPOUND_JUNGSUNG)) {
            DECOMPOSE_COMPOUND_JUNGSUNG[compound] = [pair[0], pair[1]];
        }
    }

    function decomposeWordToJamo(word) {
        const jamos = [];
        for (const ch of word) {
            const d = HANGUL.decompose(ch);
            if (d) {
                jamos.push({ char: d.cho, type: 'cho', syllable: ch });
                const jungParts = DECOMPOSE_COMPOUND_JUNGSUNG[d.jung];
                if (jungParts) {
                    jungParts.forEach(j => jamos.push({ char: j, type: 'jung', syllable: ch }));
                } else {
                    jamos.push({ char: d.jung, type: 'jung', syllable: ch });
                }
                if (d.jong) {
                    const jongParts = HANGUL.DECOMPOSE_COMPOUND_JONGSUNG && HANGUL.DECOMPOSE_COMPOUND_JONGSUNG[d.jong];
                    if (jongParts) {
                        jongParts.forEach(j => jamos.push({ char: j, type: 'jong', syllable: ch }));
                    } else {
                        jamos.push({ char: d.jong, type: 'jong', syllable: ch });
                    }
                }
            } else {
                jamos.push({ char: ch, type: 'other', syllable: ch });
            }
        }
        return jamos;
    }

    function getNextJamo() {
        const w = wordsTargetList[wordsCurrentIndex];
        if (!w) return null;
        const jamos = decomposeWordToJamo(w.word);
        const idx = wordsCompState.length;
        return idx < jamos.length ? jamos[idx] : null;
    }

    function renderWordsTarget() {
        const w = wordsTargetList[wordsCurrentIndex];
        if (!w) return;
        document.getElementById('wordsTargetComposed').textContent = w.word;
        document.getElementById('wordsTargetPhonetic').textContent = w.phonetic || '';
        document.getElementById('wordsTargetMeaning').textContent = w.meaning || '';
        document.getElementById('wordsMatchResult').classList.add('hidden');
        updateWordsJamoDisplay();
    }

    function updateWordsKeyboardHighlight() {
        const next = getNextJamo();
        const nextChar = next ? next.char : null;
        if (nextChar && HANGUL.KEYBOARD_SHIFT_MAP) {
            const isShiftOnly = Object.values(HANGUL.KEYBOARD_SHIFT_MAP).includes(nextChar) && !Object.values(HANGUL.KEYBOARD_MAP).includes(nextChar);
            if (isShiftOnly && !wordsShiftActive) {
                wordsShiftActive = true;
                document.getElementById('wordsShiftBtn').classList.add('active');
            } else if (!isShiftOnly && wordsShiftActive) {
                wordsShiftActive = false;
                document.getElementById('wordsShiftBtn').classList.remove('active');
            }
        }
        renderHangulKeyboard(document.getElementById('wordsKeyboard'), wordsShiftActive, (ch) => {
            wordsCompState.push(ch);
            updateWordsOutput();
        }, nextChar);
    }

    function updateWordsJamoDisplay() {
        const w = wordsTargetList[wordsCurrentIndex];
        if (!w) return;
        const container = document.getElementById('wordsTargetWord');
        container.innerHTML = '';
        const jamos = decomposeWordToJamo(w.word);
        const typed = wordsCompState.length;

        let syllableGroup = null;
        let groupEl = null;

        jamos.forEach((j, i) => {
            if (j.syllable !== syllableGroup) {
                syllableGroup = j.syllable;
                groupEl = document.createElement('span');
                groupEl.className = 'jamo-syllable-group';
                container.appendChild(groupEl);
            }
            const span = document.createElement('span');
            span.textContent = j.char;
            if (i < typed) {
                span.className = 'jamo-typed';
            } else if (i === typed) {
                span.className = 'jamo-next';
            } else {
                span.className = 'jamo-pending';
            }
            groupEl.appendChild(span);
        });

        updateWordsKeyboardHighlight();
    }

    function updateWordsOutput() {
        const text = composeFromState(wordsCompState);
        const output = document.getElementById('wordsTypeOutput');
        output.textContent = text;
        output.dataset.placeholder = t('hangul_type_placeholder');

        updateWordsJamoDisplay();

        const w = wordsTargetList[wordsCurrentIndex];
        if (w && text === w.word && !wordsAdvancing) {
            wordsAdvancing = true;
            const result = document.getElementById('wordsMatchResult');
            result.classList.remove('hidden');
            result.textContent = '✓ ' + t('words_correct');
            result.className = 'words-match-result words-match-correct';
            wordsCompleted.add(wordsCurrentIndex);
            renderWordsChipBar();

            (async () => {
                await playKoreanTTS(w.word);
                await new Promise(r => setTimeout(r, 800));
                wordsAdvancing = false;
                if (wordsCurrentIndex < wordsTargetList.length - 1) {
                    wordsCurrentIndex++;
                    wordsCompState = [];
                    result.classList.add('hidden');
                    renderWordsChipBar();
                    renderWordsTarget();
                    updateWordsOutput();
                } else {
                    result.textContent = '🎉 ' + t('words_all_complete');
                    result.className = 'words-match-result words-match-correct';
                }
            })();
        }
    }

    document.getElementById('wordsShiftBtn').addEventListener('click', () => {
        wordsShiftActive = !wordsShiftActive;
        document.getElementById('wordsShiftBtn').classList.toggle('active', wordsShiftActive);
        updateWordsKeyboardHighlight();
    });

    document.getElementById('wordsBackspace').addEventListener('click', () => {
        if (wordsCompState.length > 0) { wordsCompState.pop(); updateWordsOutput(); }
    });

    document.getElementById('wordsSpace').addEventListener('click', () => {
        wordsCompState.push(' ');
        updateWordsOutput();
    });

    function loadWordsFromSentence(sentenceText) {
        const words = sentenceText.split(/\s+/).filter(w => w.length > 0);
        wordsTargetList = words.map(w => ({ word: w, phonetic: '', meaning: '' }));
        wordsCurrentIndex = 0;
        wordsCompState = [];
        wordsCompleted = new Set();
        wordsSentenceSource = sentenceText;

        wordsTargetList.forEach((wObj, i) => {
            fetch('/api/hangul/meaning', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: wObj.word, lang: getUILang() })
            }).then(r => {
                if (r.status === 429) { showEnergyPopup(); return null; }
                return r.json();
            }).then(data => {
                if (data && data.has_meaning) {
                    wordsTargetList[i].meaning = data.meaning;
                    if (i === wordsCurrentIndex) renderWordsTarget();
                }
            }).catch(() => {});
        });
    }

    function initSentencesPanel() {
        const kb = document.getElementById('hSentKeyboard');
        renderHangulKeyboard(kb, sentShiftActive, (ch) => {
            sentCompState.push(ch);
            updateSentOutput();
        });

        if (!sentTarget) {
            sentTarget = DEFAULT_SENTENCES[0];
        }

        renderSentTarget();
        updateSentOutput();

        if (sentFromHome && sentTarget) {
            const hdr = document.getElementById('hSentSourceHeader');
            hdr.classList.remove('hidden');
            hdr.textContent = sentTarget.text;
        } else {
            document.getElementById('hSentSourceHeader').classList.add('hidden');
        }
    }

    document.getElementById('sentShuffleBtn').addEventListener('click', () => {
        sentFromHome = false;
        const currentText = sentTarget ? sentTarget.text : '';
        const others = DEFAULT_SENTENCES.filter(s => s.text !== currentText);
        sentTarget = others[Math.floor(Math.random() * others.length)];
        sentCompState = [];
        document.getElementById('hSentSourceHeader').classList.add('hidden');
        renderSentTarget();
        updateSentOutput();
    });

    function renderSentTarget() {
        if (!sentTarget) return;
        document.getElementById('hSentTarget').textContent = sentTarget.text;
        document.getElementById('hSentPhonetic').textContent = sentTarget.phonetic || '';
        document.getElementById('hSentMeaning').textContent = sentTarget.meaning || '';
        document.getElementById('hSentScore').classList.add('hidden');
    }

    function updateSentOutput() {
        const typed = composeFromState(sentCompState);
        const output = document.getElementById('hSentOutput');
        output.innerHTML = '';

        if (!sentTarget) { output.textContent = typed; return; }

        const target = sentTarget.text;
        for (let i = 0; i < typed.length; i++) {
            const span = document.createElement('span');
            span.textContent = typed[i];
            if (i < target.length) {
                span.className = typed[i] === target[i] ? 'sent-char-correct' : 'sent-char-wrong';
            } else {
                span.className = 'sent-char-extra';
            }
            output.appendChild(span);
        }

        if (typed === target) {
            const scoreEl = document.getElementById('hSentScore');
            scoreEl.classList.remove('hidden');
            scoreEl.textContent = '✓ ' + t('sentences_complete');
            scoreEl.className = 'hsent-score hsent-score-success';
            playKoreanTTS(target);
        }
    }

    document.getElementById('hSentShiftBtn').addEventListener('click', () => {
        sentShiftActive = !sentShiftActive;
        document.getElementById('hSentShiftBtn').classList.toggle('active', sentShiftActive);
        renderHangulKeyboard(document.getElementById('hSentKeyboard'), sentShiftActive, (ch) => {
            sentCompState.push(ch);
            updateSentOutput();
        });
    });

    document.getElementById('hSentBackspace').addEventListener('click', () => {
        if (sentCompState.length > 0) { sentCompState.pop(); updateSentOutput(); }
    });

    document.getElementById('hSentSpace').addEventListener('click', () => {
        sentCompState.push(' ');
        updateSentOutput();
    });

    function composeFromState(state) {
        let result = '';
        let i = 0;

        while (i < state.length) {
            if (state[i] === ' ') {
                result += ' ';
                i++;
                continue;
            }

            if (HANGUL.isChosung(state[i])) {
                const cho = state[i];

                if (i + 1 < state.length && HANGUL.isJungsung(state[i + 1])) {
                    let jung = state[i + 1];
                    let nextI = i + 2;

                    if (nextI < state.length && HANGUL.isJungsung(state[nextI])) {
                        const compound = HANGUL.COMPOUND_JUNGSUNG[jung + state[nextI]];
                        if (compound) {
                            jung = compound;
                            nextI++;
                        }
                    }

                    if (nextI < state.length && HANGUL.isJongsung(state[nextI]) && HANGUL.isChosung(state[nextI])) {
                        const potentialJong = state[nextI];

                        if (nextI + 1 < state.length && HANGUL.isJungsung(state[nextI + 1])) {
                            const composed = HANGUL.compose(cho, jung, null);
                            result += composed || (cho + jung);
                            i = nextI;
                            continue;
                        }

                        if (nextI + 1 < state.length && HANGUL.isChosung(state[nextI + 1]) && !HANGUL.isJungsung(state[nextI + 1])) {
                            const compJong = HANGUL.COMPOUND_JONGSUNG[potentialJong + state[nextI + 1]];
                            if (compJong) {
                                if (nextI + 2 < state.length && HANGUL.isJungsung(state[nextI + 2])) {
                                    const composed = HANGUL.compose(cho, jung, potentialJong);
                                    result += composed || (cho + jung + potentialJong);
                                    i = nextI + 1;
                                    continue;
                                }
                                const composed = HANGUL.compose(cho, jung, compJong);
                                result += composed || (cho + jung + compJong);
                                i = nextI + 2;
                                continue;
                            }
                        }

                        const composed = HANGUL.compose(cho, jung, potentialJong);
                        result += composed || (cho + jung + potentialJong);
                        i = nextI + 1;
                        continue;
                    }

                    const composed = HANGUL.compose(cho, jung, null);
                    result += composed || (cho + jung);
                    i = nextI;
                    continue;
                }

                result += cho;
                i++;
            } else if (HANGUL.isJungsung(state[i])) {
                result += state[i];
                i++;
            } else {
                result += state[i];
                i++;
            }
        }

        return result;
    }

    const jamoAudioCache = {};

    function playJamoSound(jamoChar) {
        const code = jamoChar.charCodeAt(0).toString(16);
        const url = `/static/audio/jamo/${code}.mp3`;

        if (jamoAudioCache[code]) {
            jamoAudioCache[code].currentTime = 0;
            jamoAudioCache[code].play().catch(() => {});
            return;
        }

        const audio = new Audio(url);
        audio.addEventListener('canplaythrough', () => {
            jamoAudioCache[code] = audio;
            audio.play().catch(() => {});
        }, { once: true });
        audio.addEventListener('error', () => {
            const allJamo = [
                ...HANGUL.BASIC_CONSONANTS, ...HANGUL.DOUBLE_CONSONANTS,
                ...HANGUL.BASIC_VOWELS, ...HANGUL.COMPLEX_VOWELS
            ];
            const match = allJamo.find(j => j.char === jamoChar);
            playKoreanTTS(match ? match.name : jamoChar);
        }, { once: true });
        audio.load();
    }

    async function playKoreanTTS(text) {
        if (!text || !HAS_GEMINI) return;
        try {
            const cacheKey = 'tts_hangul_' + text;
            if (ttsCache[cacheKey]) {
                playAudioBlob(ttsCache[cacheKey]);
                return;
            }

            const res = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (!handleApiResponse(res, 'tts')) return;
            if (!res.ok) {
                console.error('TTS error: response not ok', res.status);
                return;
            }

            const blob = await res.blob();
            ttsCache[cacheKey] = blob;
            playAudioBlob(blob);
        } catch (e) {
            console.error('TTS error:', e);
        }
    }


    talkChangeStar.addEventListener('click', () => {
        saveChatForStar();
        talkbotActiveScreen.classList.add('hidden');
        const nicknameScreen = document.getElementById('nicknameInputScreen');
        if (nicknameScreen) nicknameScreen.classList.add('hidden');
        starSelectScreen.classList.remove('hidden');
        currentNickname = null;
        if (talkRecording) stopTalkRecording();
    });

    talkMicBtn.addEventListener('click', () => {
        if (talkSending) return;
        if (talkRecording) {
            stopTalkRecording();
        } else {
            startTalkRecording();
        }
    });

    async function startTalkRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            talkRecordedChunks = [];

            talkMediaRecorder = new MediaRecorder(stream);
            talkMediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) talkRecordedChunks.push(e.data);
            };
            talkMediaRecorder.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                const blob = new Blob(talkRecordedChunks, { type: 'audio/webm' });
                sendTalkbot(blob);
            };

            talkAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = talkAudioContext.createMediaStreamSource(stream);
            talkAnalyser = talkAudioContext.createAnalyser();
            talkAnalyser.fftSize = 2048;
            talkAnalyser.smoothingTimeConstant = 0.8;
            source.connect(talkAnalyser);

            talkWaveformWrap.classList.remove('hidden');
            startTalkWaveform();

            talkMediaRecorder.start();
            talkRecording = true;
            talkMicBtn.classList.add('recording');
            talkMicLabel.textContent = t('talkbot_stop');
        } catch (err) {
            console.error('Mic denied:', err);
            alert(t('err_mic_denied'));
        }
    }

    function stopTalkRecording() {
        if (talkMediaRecorder && talkMediaRecorder.state === 'recording') {
            talkMediaRecorder.stop();
        }
        talkRecording = false;
        talkMicBtn.classList.remove('recording');
        talkMicLabel.textContent = t('talkbot_tap_to_speak');

        if (talkWaveformAnimId) {
            cancelAnimationFrame(talkWaveformAnimId);
            talkWaveformAnimId = null;
        }
        if (talkAudioContext) {
            talkAudioContext.close().catch(() => {});
            talkAudioContext = null;
            talkAnalyser = null;
        }
        talkWaveformWrap.classList.add('hidden');
    }

    function startTalkWaveform() {
        const canvas = talkWaveformCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        const bufferLength = talkAnalyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            talkWaveformAnimId = requestAnimationFrame(draw);
            talkAnalyser.getByteTimeDomainData(dataArray);
            ctx.clearRect(0, 0, w, h);
            const gradient = ctx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, '#ff2d78');
            gradient.addColorStop(0.5, '#b44dff');
            gradient.addColorStop(1, '#00d4ff');
            ctx.lineWidth = 2;
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            const sliceWidth = w / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * h) / 2;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                x += sliceWidth;
            }
            ctx.lineTo(w, h / 2);
            ctx.stroke();
        }
        draw();
    }

    async function sendTalkbot(blob) {
        talkSending = true;
        talkMicBtn.classList.add('thinking');
        talkMicLabel.textContent = t('talkbot_thinking');

        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble-wrap user';
        userBubble.innerHTML = '<div class="chat-bubble">🎤 ...</div>';
        talkMessages.appendChild(userBubble);
        talkMessages.scrollTop = talkMessages.scrollHeight;

        try {
            const formData = new FormData();
            formData.append('audio', blob, 'recording.webm');
            if (currentStarId) formData.append('star_id', currentStarId);
            if (currentCustomName) formData.append('custom_name', currentCustomName);
            if (currentNickname) formData.append('nickname', currentNickname);
            if (currentGender) formData.append('gender', currentGender);
            formData.append('lang', getUILang());
            formData.append('history', JSON.stringify(talkHistory));

            const res = await fetch('/api/talkbot', { method: 'POST', body: formData });
            if (!handleApiResponse(res, 'talkbot')) return;
            const data = await res.json();

            if (data.error) {
                userBubble.querySelector('.chat-bubble').textContent = '❌ ' + data.error;
                return;
            }

            userBubble.querySelector('.chat-bubble').textContent = data.recognized_text || '...';

            talkHistory.push({ role: 'user', content: data.recognized_text || '' });
            talkHistory.push({ role: 'assistant', content: data.reply_text || '' });
            if (talkHistory.length > 20) talkHistory = talkHistory.slice(-20);

            const aiBubbleWrap = document.createElement('div');
            aiBubbleWrap.className = 'chat-bubble-wrap ai';

            const aiBubble = document.createElement('div');
            aiBubble.className = 'chat-bubble';
            aiBubble.textContent = data.reply_text || '';
            aiBubbleWrap.appendChild(aiBubble);

            if (data.korean_tip) {
                const tip = document.createElement('div');
                tip.className = 'chat-korean-tip';
                tip.innerHTML = `<div class="chat-korean-tip-label">${t('chat_korean_tip')}</div><div class="chat-korean-tip-text">${data.korean_tip}</div>`;
                if (data.korean_tip_romanized) {
                    tip.innerHTML += `<div class="chat-korean-tip-detail">${data.korean_tip_romanized}</div>`;
                }
                if (data.korean_tip_meaning) {
                    tip.innerHTML += `<div class="chat-korean-tip-detail">${data.korean_tip_meaning}</div>`;
                }
                aiBubbleWrap.appendChild(tip);
            }

            if (data.correction) {
                const corr = document.createElement('div');
                corr.className = 'chat-correction';
                corr.innerHTML = `<div class="chat-correction-label">${t('chat_correction_label')}</div><div class="chat-correction-text">${data.correction}</div>`;
                if (data.explanation) {
                    corr.innerHTML += `<div class="chat-correction-explain">${data.explanation}</div>`;
                }
                aiBubbleWrap.appendChild(corr);
            }

            talkMessages.appendChild(aiBubbleWrap);
            talkMessages.scrollTop = talkMessages.scrollHeight;

            if (data.reply_audio) {
                if (currentTalkAudio) {
                    currentTalkAudio.pause();
                    currentTalkAudio = null;
                }
                currentTalkAudio = new Audio('data:audio/mp3;base64,' + data.reply_audio);
                currentTalkAudio.play().catch(() => {});
                currentTalkAudio.addEventListener('ended', () => { currentTalkAudio = null; });
            }
        } catch (err) {
            console.error('Talkbot error:', err);
            userBubble.querySelector('.chat-bubble').textContent = '❌ Error';
        } finally {
            talkSending = false;
            talkMicBtn.classList.remove('thinking');
            talkMicLabel.textContent = t('talkbot_tap_to_speak');
        }
    }

    if (learnNextBtn) learnNextBtn.addEventListener('click', () => switchSubTab('listen'));
    if (listenNextBtn) listenNextBtn.addEventListener('click', () => switchSubTab('speak'));
    if (speakBackBtn) speakBackBtn.addEventListener('click', () => switchSubTab('learn'));

    if (speakListenBtn) {
        speakListenBtn.addEventListener('click', () => {
            if (lastOriginal) playTTS(speakListenBtn);
        });
    }

    function updateEnergyIndicator(remaining, total, isPremium) {
        const indicator = document.getElementById('energyIndicator');
        const countEl = document.getElementById('energyCount');
        if (!indicator || !countEl) return;

        indicator.classList.remove('energy-low', 'energy-premium');

        if (isPremium) {
            countEl.innerHTML = '&#8734;';
            indicator.classList.add('energy-premium');
        } else {
            countEl.textContent = remaining;
            if (remaining <= 5) indicator.classList.add('energy-low');
        }
    }

    function pulseEnergyHeart() {
        const indicator = document.getElementById('energyIndicator');
        if (!indicator) return;
        indicator.classList.remove('pulse');
        void indicator.offsetWidth;
        indicator.classList.add('pulse');
        setTimeout(() => indicator.classList.remove('pulse'), 500);
    }

    function handleEnergyFromResponse(data) {
        if (data && typeof data.energy_remaining === 'number') {
            updateEnergyIndicator(data.energy_remaining, data.energy_total || 30, false);
            pulseEnergyHeart();
        }
    }

    const _origFetch = window.fetch;
    window.fetch = async function(...args) {
        const response = await _origFetch.apply(this, args);
        const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
        if (url.startsWith('/api/') && !url.includes('/api/usage') && response.ok) {
            const ct = response.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
                const clone = response.clone();
                clone.json().then(data => handleEnergyFromResponse(data)).catch(() => {});
            }
        }
        return response;
    };

    async function fetchEnergy() {
        try {
            const res = await fetch('/api/usage');
            const data = await res.json();
            if (data.dev_mode) {
                updateEnergyIndicator(999, 999, false);
                return data;
            }
            const isPremium = data.is_premium === true;
            updateEnergyIndicator(data.energy_remaining, data.energy_total, isPremium);
            return data;
        } catch (e) {
            return null;
        }
    }

    function getStarLocalName() {
        const lang = getUILang();
        if (currentStarId && personasList.length) {
            const star = personasList.find(s => s.id === currentStarId);
            if (star) {
                const localName = (star.names && star.names[lang]) || (lang === 'en' ? star.name_en : star.name_kr);
                return localName.split(' (')[0];
            }
        }
        if (currentCustomName) return currentCustomName;
        const defaultId = localStorage.getItem('kvoice_default_star');
        if (defaultId && personasList.length) {
            const star = personasList.find(s => s.id === defaultId);
            if (star) {
                const localName = (star.names && star.names[lang]) || (lang === 'en' ? star.name_en : star.name_kr);
                return localName.split(' (')[0];
            }
        }
        return 'K-Star';
    }

    function getProfileMasteredCounts() {
        let expressions = 0;
        let words = 0;
        try {
            expressions = parseInt(localStorage.getItem('kagit_expressions_mastered') || '0', 10);
            words = parseInt(localStorage.getItem('kagit_words_mastered') || '0', 10);
        } catch(e) {}
        return { expressions, words };
    }

    function getAgitLevel(totalUsed) {
        if (totalUsed >= 500) return t('profile_level_master') || 'Agit Master';
        if (totalUsed >= 100) return t('profile_level_superfan') || 'Super Fan';
        return t('profile_level_newbie') || 'Newbie';
    }

    function getDayCount() {
        const user = window.KAGIT_USER;
        if (!user || !user.created_at) return null;
        try {
            const created = new Date(user.created_at);
            const now = new Date();
            const diffMs = now - created;
            return Math.max(1, Math.floor(diffMs / 86400000) + 1);
        } catch(e) { return null; }
    }

    function updateProfileSubBadge() {
        const el = document.getElementById('profileSubBadge');
        if (!el) return;
        const user = window.KAGIT_USER;
        if (user && user.id && user.is_premium) {
            el.innerHTML = `<span class="profile-sub-badge-premium"><svg width="16" height="16" viewBox="0 0 24 24" fill="#ffd700" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${t('profile_sub_premium') || 'Premium Member'}</span>`;
        } else if (user && user.id) {
            el.innerHTML = `<span class="profile-sub-badge-free"><button onclick="document.getElementById('profileBottomCta').scrollIntoView({behavior:'smooth'})">${t('profile_sub_free_cta') || 'Upgrade to Premium'}</button></span>`;
        } else {
            el.innerHTML = '';
        }
    }

    function updateProfileStats(energyUsed) {
        const starName = getStarLocalName();
        const dayCount = getDayCount();
        const dayLabel = document.getElementById('statDayLabel');
        const dayValue = document.getElementById('statDayCount');
        if (dayValue && dayLabel) {
            if (dayCount !== null) {
                dayValue.textContent = dayCount;
                dayLabel.textContent = (t('profile_day_count') || 'Day {n} with {name}').replace('{n}', dayCount).replace('{name}', starName);
            } else {
                dayValue.textContent = '--';
                dayLabel.textContent = t('profile_day_count_guest') || 'Sign up to start tracking!';
            }
        }
        const counts = getProfileMasteredCounts();
        const exprEl = document.getElementById('statExpressions');
        const wordsEl = document.getElementById('statWords');
        if (exprEl) exprEl.textContent = counts.expressions;
        if (wordsEl) wordsEl.textContent = counts.words;

        const levelEl = document.getElementById('statLevel');
        if (levelEl) {
            const used = (energyUsed != null) ? energyUsed : parseInt(localStorage.getItem('kagit_total_energy_used') || '0', 10);
            levelEl.textContent = getAgitLevel(used);
        }
    }

    function updateProfileStarName() {
        const profileName = document.getElementById('profileName');
        if (profileName) {
            const starName = getStarLocalName();
            profileName.textContent = (t('profile_agit_mate') || "{name}'s Agit Mate").replace('{name}', starName);
        }
        updateProfileStats();
    }

    function initProfileEvents() {
        const editPicBtn = document.getElementById('editProfilePicBtn');
        const picInput = document.getElementById('profilePicInput');
        const editNameBtn = document.getElementById('editNicknameBtn');
        
        if (editPicBtn && picInput) {
            editPicBtn.onclick = () => picInput.click();
            picInput.onchange = async (e) => {
                if (!window.KAGIT_USER || !window.KAGIT_USER.id) return;
                const file = e.target.files[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                try {
                    const res = await fetch("/api/upload-avatar-final", {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    if (res.status === 401) {
                        showToast(t('please_login') || 'Please log in first', 'error');
                        return;
                    }
                    if (data.success) {
                        window.KAGIT_USER.profile_image_url = data.url;
                        initAuthUI();
                    }
                } catch (err) { console.error(err); }
            };
        }
        
        if (editNameBtn) {
            editNameBtn.onclick = async () => {
                if (!window.KAGIT_USER || !window.KAGIT_USER.id) return;
                const oldName = window.KAGIT_USER.first_name || '';
                const newName = prompt(t('profile_edit_name_prompt') || "Enter your name:", oldName);
                if (newName !== null && newName !== oldName) {
                    try {
                        const res = await fetch("/auth/update-profile-final", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ first_name: newName })
                        });
                        const data = await res.json();
                        if (res.status === 401) {
                            showToast(t('please_login') || 'Please log in first', 'error');
                            return;
                        }
                        if (data.success) {
                            window.KAGIT_USER.first_name = newName;
                            initAuthUI();
                        }
                    } catch (err) { console.error(err); }
                }
            };
        }
    }

    function initAuthUI() {
        const user = window.KAGIT_USER;
        const authSection = document.getElementById('authSection');
        const authUserSection = document.getElementById('authUserSection');
        const profileAvatar = document.getElementById('profileAvatar');
        const profileName = document.getElementById('profileName');
        const profileStatus = document.getElementById('profileStatus');
        const bottomCta = document.getElementById('profileBottomCta');

        updateProfileSubBadge();

        const starName = getStarLocalName();

        if (user && user.id) {
            if (authSection) authSection.classList.add('hidden');
            if (authUserSection) authUserSection.classList.remove('hidden');

            const editPicBtn = document.getElementById('editProfilePicBtn');
            const editNameBtn = document.getElementById('editNicknameBtn');
            if (editPicBtn) editPicBtn.style.display = '';
            if (editNameBtn) editNameBtn.style.display = '';

            if (profileName) {
                profileName.textContent = user.first_name || user.email.split('@')[0] || starName;
            }

            if (profileAvatar && user.profile_image_url) {
                profileAvatar.innerHTML = `<img src="${user.profile_image_url}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
            }

            if (profileStatus) {
                profileStatus.textContent = user.email || '';
            }

            if (bottomCta) {
                if (user.is_premium) {
                    bottomCta.style.display = '';
                    loadSubscriptionInfo(bottomCta);
                } else {
                    bottomCta.style.display = '';
                    loadPlanCards(bottomCta);
                }
            }
        } else {
            if (authSection) authSection.classList.remove('hidden');
            if (authUserSection) authUserSection.classList.add('hidden');

            const editPicBtn2 = document.getElementById('editProfilePicBtn');
            const editNameBtn2 = document.getElementById('editNicknameBtn');
            if (editPicBtn2) editPicBtn2.style.display = 'none';
            if (editNameBtn2) editNameBtn2.style.display = 'none';

            if (profileName) {
                profileName.textContent = (t('profile_agit_mate') || "{name}'s Agit Mate").replace('{name}', starName);
            }
            if (bottomCta) {
                bottomCta.style.display = '';
                bottomCta.innerHTML = `<div class="plan-price" style="margin-bottom:4px">${t('profile_bottom_cta_price') || 'Unlimited energy from $0.99'} <button class="premium-info-btn" onclick="window._showPremiumBenefits()">?</button></div><p>${t('profile_bottom_cta') || 'Running low on energy? Go Premium now and chat with your bias forever!'}</p><button class="premium-btn" onclick="window._goPremium('monthly')">${t('premium_btn') || 'Go Premium'}</button>`;
            }
            initAuthForm();
        }

        updateProfileStats();
        initProfileEnergyToggle();
        initProfileEvents();
    }

    function initAuthForm() {
        let isSignUp = true;
        const form = document.getElementById('authForm');
        const nameInput = document.getElementById('authName');
        const emailInput = document.getElementById('authEmail');
        const passwordInput = document.getElementById('authPassword');
        const submitBtn = document.getElementById('authSubmitBtn');
        const toggleLink = document.getElementById('authToggleLink');
        const toggleMsg = document.getElementById('authToggleMsg');
        const errorDiv = document.getElementById('authError');

        if (!form || !toggleLink) return;

        function updateFormMode() {
            if (isSignUp) {
                if (nameInput) nameInput.classList.remove('hidden');
                submitBtn.textContent = t('auth_signup') || 'Sign Up';
                toggleMsg.textContent = t('auth_have_account') || 'Already have an account?';
                toggleLink.textContent = t('auth_signin') || 'Log In';
            } else {
                if (nameInput) nameInput.classList.add('hidden');
                submitBtn.textContent = t('auth_signin') || 'Log In';
                toggleMsg.textContent = t('auth_no_account') || 'Don\'t have an account?';
                toggleLink.textContent = t('auth_signup') || 'Sign Up';
            }
            if (errorDiv) errorDiv.classList.add('hidden');
        }

        toggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            isSignUp = !isSignUp;
            updateFormMode();
        });

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (errorDiv) errorDiv.classList.add('hidden');

            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const url = isSignUp ? '/auth/signup' : '/auth/login';
            const body = { email, password };
            if (isSignUp && nameInput) body.first_name = nameInput.value.trim();

            try {
                submitBtn.disabled = true;
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const data = await res.json();
                if (data.success && data.user) {
                    window.KAGIT_USER = data.user;
                    initAuthUI();
                    loadUsageStatus();
                } else {
                    const errKey = data.error_key;
                    const errMsg = (errKey && t(errKey)) || data.error || 'An error occurred.';
                    if (errorDiv) {
                        errorDiv.textContent = errMsg;
                        errorDiv.classList.remove('hidden');
                    }
                }
            } catch (err) {
                if (errorDiv) {
                    errorDiv.textContent = 'Connection error. Please try again.';
                    errorDiv.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled = false;
            }
        });

        updateFormMode();
    }

    let _premiumPollInterval = null;

    function startPremiumPolling() {
        if (_premiumPollInterval) clearInterval(_premiumPollInterval);
        let elapsed = 0;
        const maxTime = 300000;
        _premiumPollInterval = setInterval(async () => {
            elapsed += 4000;
            if (elapsed > maxTime) {
                clearInterval(_premiumPollInterval);
                _premiumPollInterval = null;
                return;
            }
            try {
                const data = await fetchEnergy();
                if (data && data.is_premium) {
                    clearInterval(_premiumPollInterval);
                    _premiumPollInterval = null;
                    window.KAGIT_USER.is_premium = true;
                    updateEnergyIndicator(0, 0, true);
                    showChatSavedToast();
                    initAuthUI();
                }
            } catch (e) {}
        }, 4000);
    }

    async function handleGoPremium(planId, useRedirect) {
        const user = window.KAGIT_USER;
        if (!user || !user.id) {
            showEnergyPopup();
            return;
        }
        if (user.is_premium) return;

        const plan = planId || 'monthly';
        try {
            const res = await fetch('/api/payment/create-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: plan }),
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
                return;
            }
            if (data.pay_station_url) {
                if (useRedirect) {
                    localStorage.setItem('kagit_awaiting_payment', '1');
                    window.location.href = data.pay_station_url;
                } else {
                    window.open(data.pay_station_url, '_blank');
                    startPremiumPolling();
                }
            }
        } catch (e) {
            alert('Payment service temporarily unavailable.');
        }
    }

    function initProfileEnergyToggle() {
        const toggleBtn = document.getElementById('profileEnergyToggle');
        const detailsEl = document.getElementById('profileEnergyDetails');
        if (!toggleBtn || !detailsEl) return;
        toggleBtn.onclick = function() {
            const isOpen = !detailsEl.classList.contains('hidden');
            if (isOpen) {
                detailsEl.classList.add('hidden');
                toggleBtn.classList.remove('open');
            } else {
                detailsEl.classList.remove('hidden');
                toggleBtn.classList.add('open');
            }
        };
    }

    async function loadUsageStatus() {
        try {
            const data = await fetchEnergy();
            if (!data) return;

            const energySection = document.getElementById('profileEnergySection');
            const energyFill = document.getElementById('profileEnergyFill');
            const energyCount = document.getElementById('profileEnergyCount');
            const energyDetails = document.getElementById('profileEnergyDetails');

            if (data.dev_mode) {
                if (energySection) energySection.classList.add('hidden');
                updateProfileStats(0);
                return;
            }

            if (energySection) energySection.classList.remove('hidden');

            const isPremium = data.is_premium === true;

            if (isPremium) {
                if (energyCount) energyCount.textContent = t('premium_unlimited') || 'Unlimited';
                if (energyFill) {
                    energyFill.style.width = '100%';
                    energyFill.className = 'profile-energy-bar-fill';
                }
                if (energyDetails) energyDetails.innerHTML = '';
                updateProfileStats(data.energy_used || 0);
                localStorage.setItem('kagit_total_energy_used', String(data.energy_used || 0));
                return;
            }

            const used = data.energy_used || 0;
            const total = data.energy_total || 30;
            const remaining = data.energy_remaining || 0;
            const pct = Math.min((used / total) * 100, 100);

            localStorage.setItem('kagit_total_energy_used', String(used));

            if (energyCount) energyCount.textContent = `${remaining} / ${total}`;
            if (energyFill) {
                let fillClass = 'profile-energy-bar-fill';
                if (pct >= 100) fillClass += ' energy-empty';
                else if (pct >= 70) fillClass += ' energy-low';
                energyFill.className = fillClass;
                energyFill.style.width = `${pct}%`;
            }

            updateProfileStats(used);

            if (energyDetails) {
                const costs = data.costs || {};
                const costLabels = {
                    meaning: t('usage_meaning') || 'Meaning',
                    grammar: t('usage_grammar') || 'Grammar',
                    generate: t('usage_generate') || 'Generate',
                    chat: t('usage_chat') || 'Chat',
                    talkbot: t('usage_talkbot') || 'Talkbot',
                    tts: t('usage_tts') || 'TTS',
                    stt: t('usage_stt') || 'STT',
                    translate: t('usage_translate') || 'Translate',
                    verify: t('usage_verify') || 'Verify',
                };
                const costOrder = ['chat', 'talkbot', 'generate', 'grammar', 'meaning', 'tts', 'stt', 'verify', 'translate'];
                let html = '';
                for (const key of costOrder) {
                    const c = costs[key];
                    if (c === undefined) continue;
                    const label = costLabels[key] || key;
                    const costText = c === 0 ? (t('energy_free') || 'Free') : c;
                    html += `<div class="usage-row">
                        <div class="usage-row-header">
                            <span class="usage-label">${label}</span>
                            <span class="usage-count">${costText} ${c === 0 ? '' : (t('energy_label') || 'energy')}</span>
                        </div>
                    </div>`;
                }
                energyDetails.innerHTML = html;
            }
        } catch (e) {
            console.error('Failed to load usage:', e);
        }
    }

    async function loadPlanCards(ctaEl) {
        try {
            const res = await fetch('/api/payment/plans');
            const data = await res.json();
            if (!data.plans || data.plans.length === 0) return;

            const hasTrial = data.plans.some(p => p.id === 'trial');
            let html = `<p class="premium-cta-text"><span data-i18n="premium_cta">${t('premium_cta') || 'Upgrade to Premium for unlimited access'}</span> <button class="premium-info-btn" onclick="window._showPremiumBenefits()">?</button></p><div class="plan-cards">`;
            for (const plan of data.plans) {
                if (plan.id === 'monthly' && hasTrial) continue;
                let badge = '';
                let btnClass = 'plan-btn';
                let priceHtml = '';
                if (plan.id === 'trial') {
                    badge = `<span class="plan-badge plan-badge-trial">${t('plan_trial_badge') || 'First Month'}</span>`;
                    priceHtml = `<div class="plan-price">$${plan.price.toFixed(2)} <span class="plan-period">${t('plan_first_month') || 'first month'}</span></div>`;
                    priceHtml += `<div class="plan-renewal">${(t('plan_then_monthly') || 'then $4.99/month').replace('$4.99', '$' + plan.regular_price.toFixed(2))}</div>`;
                } else if (plan.id === 'yearly') {
                    badge = `<span class="plan-badge plan-badge-best">${t('plan_best_value') || 'Best Value'}</span>`;
                    btnClass = 'plan-btn plan-btn-best';
                    priceHtml = `<div class="plan-price">$${plan.price.toFixed(2)} <span class="plan-period">${t('plan_per_year') || '/ year'}</span></div>`;
                } else {
                    priceHtml = `<div class="plan-price">$${plan.price.toFixed(2)} <span class="plan-period">${t('plan_per_month') || '/ month'}</span></div>`;
                }
                let planBtnLabel;
                if (plan.id === 'trial') planBtnLabel = t('plan_btn_trial') || 'Start $0.99';
                else if (plan.id === 'yearly') planBtnLabel = t('plan_btn_yearly') || 'Go Yearly';
                else planBtnLabel = t('plan_btn_monthly') || 'Go Monthly';
                html += `<div class="plan-card">
                    ${badge}
                    ${priceHtml}
                    <button class="${btnClass}" onclick="window._goPremium('${plan.id}')">${planBtnLabel}</button>
                </div>`;
            }
            html += '</div>';
            ctaEl.innerHTML = html;
        } catch (e) {}
    }

    async function loadSubscriptionInfo(ctaEl) {
        try {
            const res = await fetch('/api/payment/subscription-info');
            const data = await res.json();
            if (!data.is_premium) return;

            const planLabel = data.current_plan === 'yearly'
                ? (t('plan_current_yearly') || 'Yearly Plan')
                : (t('plan_current_monthly') || 'Monthly Plan');

            const isCancelled = data.subscription_cancelled;
            let expiresStr = '';
            if (data.premium_expires_at) {
                const d = new Date(data.premium_expires_at);
                expiresStr = d.toLocaleDateString();
            }

            let html = '<div class="sub-info-card">';
            html += `<div class="sub-info-plan"><span class="sub-info-label">${t('plan_current_label') || 'Current Plan'}</span><span class="sub-info-value">${planLabel}${isCancelled ? ` <span class="sub-cancelled-badge">${t('plan_cancelled_status') || 'Cancelled'}</span>` : ''}</span></div>`;
            if (expiresStr) {
                const expiresLabel = isCancelled ? (t('plan_expires_on') || 'Expires on') : (t('plan_expires') || 'Renews on');
                html += `<div class="sub-info-expires"><span class="sub-info-label">${expiresLabel}</span><span class="sub-info-value">${expiresStr}</span></div>`;
            }
            if (data.is_changeable) {
                html += `<div class="upgrade-card">
                    <span class="plan-badge plan-badge-best">${t('plan_best_value') || 'Best Value'}</span>
                    <div class="plan-price">$49.99 <span class="plan-period">${t('plan_per_year') || '/ year'}</span></div>
                    <button class="plan-btn plan-btn-best" onclick="window._changePlan()">${t('plan_upgrade_yearly') || 'Upgrade to Yearly - Save 17%'}</button>
                </div>`;
            }
            if (data.can_cancel) {
                html += `<button class="sub-cancel-btn" onclick="window._cancelSubscription()">${t('plan_cancel_btn') || 'Cancel Subscription'}</button>`;
            }
            html += '</div>';
            ctaEl.innerHTML = html;
        } catch (e) {
            console.error('Failed to load subscription info:', e);
        }
    }

    window._changePlan = async function() {
        const btn = document.querySelector('.plan-switch-btn');
        if (btn) {
            btn.disabled = true;
            btn.textContent = '...';
        }
        try {
            const res = await fetch('/api/payment/change-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
                if (btn) { btn.disabled = false; btn.textContent = t('plan_switch_yearly') || 'Switch to Yearly - Save 17%'; }
                return;
            }
            if (data.pay_station_url) {
                window.open(data.pay_station_url, '_blank');
                if (btn) { btn.disabled = false; btn.textContent = t('plan_switch_yearly') || 'Switch to Yearly - Save 17%'; }
                startPlanChangePolling();
            }
        } catch (e) {
            console.error('Plan change error:', e);
            if (btn) { btn.disabled = false; btn.textContent = t('plan_switch_yearly') || 'Switch to Yearly - Save 17%'; }
        }
    };

    function startPlanChangePolling() {
        let attempts = 0;
        const interval = setInterval(async () => {
            attempts++;
            if (attempts > 60) { clearInterval(interval); return; }
            try {
                const res = await fetch('/api/payment/subscription-info');
                const data = await res.json();
                if (data.current_plan === 'yearly') {
                    clearInterval(interval);
                    const bottomCta = document.getElementById('profileBottomCta');
                    if (bottomCta) loadSubscriptionInfo(bottomCta);
                }
            } catch (e) {}
        }, 5000);
    }

    window._cancelSubscription = async function() {
        const confirmMsg = t('plan_cancel_confirm') || 'Your premium access continues until the expiry date. No further charges will be made.';
        if (!confirm(confirmMsg)) return;

        const btn = document.querySelector('.sub-cancel-btn');
        if (btn) { btn.disabled = true; btn.textContent = '...'; }

        try {
            const res = await fetch('/api/payment/cancel-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
                if (btn) { btn.disabled = false; btn.textContent = t('plan_cancel_btn') || 'Cancel Subscription'; }
                return;
            }
            const bottomCta = document.getElementById('profileBottomCta');
            if (bottomCta) loadSubscriptionInfo(bottomCta);
        } catch (e) {
            console.error('Cancel error:', e);
            if (btn) { btn.disabled = false; btn.textContent = t('plan_cancel_btn') || 'Cancel Subscription'; }
        }
    };

    window._goPremium = function(planId) { handleGoPremium(planId); };

    window._showPremiumBenefits = function() {
        const existing = document.querySelector('.premium-benefits-overlay');
        if (existing) existing.remove();
        const benefits = [
            t('benefit_unlimited_energy') || 'Unlimited energy (no daily limit)',
            t('benefit_unlimited_chat') || 'Unlimited AI chat with your K-Star',
            t('benefit_unlimited_stt') || 'Unlimited pronunciation check',
            t('benefit_unlimited_tts') || 'Unlimited text-to-speech',
            t('benefit_unlimited_grammar') || 'Unlimited grammar analysis',
            t('benefit_unlimited_content') || 'Unlimited content generation'
        ];
        const overlay = document.createElement('div');
        overlay.className = 'premium-benefits-overlay';
        overlay.innerHTML = `<div class="premium-benefits-popup">
            <button class="premium-benefits-close" onclick="this.closest('.premium-benefits-overlay').remove()">&times;</button>
            <h3>${t('benefits_title') || 'Premium Benefits'}</h3>
            <ul>${benefits.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>`;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);
    };

    function showEnergyPopup() {
        const existing = document.querySelector('.energy-popup-overlay');
        if (existing) existing.remove();

        const isLoggedIn = window.KAGIT_USER && window.KAGIT_USER.id;
        const overlay = document.createElement('div');
        overlay.className = 'energy-popup-overlay';

        const card = document.createElement('div');
        card.className = 'energy-popup-card';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'energy-popup-close';
        closeBtn.innerHTML = '&#x2715;';
        closeBtn.addEventListener('click', () => overlay.remove());

        const textEl = document.createElement('p');
        textEl.className = 'energy-popup-text';
        textEl.textContent = isLoggedIn ? (t('err_energy_depleted') || '') : (t('energy_popup_guest_text') || '');

        const ctaBtn = document.createElement('button');
        ctaBtn.className = 'energy-popup-btn';

        if (isLoggedIn) {
            ctaBtn.textContent = t('energy_popup_cta') || 'Unlock Unlimited Access';
            ctaBtn.addEventListener('click', () => {
                overlay.remove();
                handleGoPremium('monthly');
            });
        } else {
            const googleSvg = '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
            ctaBtn.innerHTML = googleSvg + '<span>' + (t('energy_popup_guest_cta') || 'Continue with Google & Subscribe') + '</span>';
            ctaBtn.addEventListener('click', () => {
                localStorage.setItem('kagit_pending_premium', 'monthly');
                window.location.href = '/login/google';
            });
        }

        card.appendChild(closeBtn);
        card.appendChild(textEl);
        card.appendChild(ctaBtn);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        updateEnergyIndicator(0, 30, false);
    }

    function showChatSavedToast() {
        const existing = document.querySelector('.chat-saved-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'chat-saved-toast';
        toast.textContent = t('chat_saved_msg') || 'Your conversation has been safely saved!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 6000);
    }

    function handleApiResponse(res, feature) {
        if (res.status === 429) {
            showEnergyPopup();
            return false;
        }
        return true;
    }

    window._handleApiResponse = handleApiResponse;

    function renderOnboardingStarGrid() {
        const kpopGrid = document.getElementById('obKpopGrid');
        const actorGrid = document.getElementById('obActorGrid');
        if (!kpopGrid || !actorGrid) return;
        kpopGrid.innerHTML = '';
        actorGrid.innerHTML = '';
        const lang = getUILang();
        personasList.forEach(star => {
            const card = document.createElement('div');
            card.className = 'onboarding-star-card';
            card.dataset.starId = star.id;
            const photoDiv = document.createElement('div');
            photoDiv.className = 'star-card-photo';
            if (star.photo) {
                const img = document.createElement('img');
                img.src = star.photo;
                img.alt = star.name_en;
                img.loading = 'lazy';
                photoDiv.appendChild(img);
            }
            const nameSpan = document.createElement('span');
            nameSpan.className = 'star-card-name';
            nameSpan.textContent = (star.names && star.names[lang]) || star.name_en;
            card.appendChild(photoDiv);
            card.appendChild(nameSpan);
            card.addEventListener('click', () => {
                document.querySelectorAll('.onboarding-star-card.selected').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                obSelectedStar = star.id;
                updateObStartBtn();
            });
            if (star.category === 'actor') {
                actorGrid.appendChild(card);
            } else {
                kpopGrid.appendChild(card);
            }
        });
    }

    let obSelectedMode = null;
    let obSelectedStar = null;

    function updateObStartBtn() {
        const btn = document.getElementById('onboardingStartBtn');
        if (btn) btn.disabled = !(obSelectedMode && obSelectedStar);
    }

    function initOnboarding() {
        if (localStorage.getItem('kvoice_onboarded') === 'true') return;
        const overlay = document.getElementById('onboardingOverlay');
        if (!overlay) return;
        overlay.classList.remove('hidden');

        const step1 = document.getElementById('onboardingStep1');
        const step2 = document.getElementById('onboardingStep2');
        const cardHangul = document.getElementById('obCardHangul');
        const cardKorean = document.getElementById('obCardKorean');
        const startBtn = document.getElementById('onboardingStartBtn');

        if (cardHangul) {
            cardHangul.addEventListener('click', () => {
                obSelectedMode = 'hangul';
                cardHangul.classList.add('selected');
                cardKorean.classList.remove('selected');
                setTimeout(() => {
                    step1.classList.add('hidden');
                    step2.classList.remove('hidden');
                    updateObStartBtn();
                }, 200);
            });
        }
        if (cardKorean) {
            cardKorean.addEventListener('click', () => {
                obSelectedMode = 'korean';
                cardKorean.classList.add('selected');
                cardHangul.classList.remove('selected');
                setTimeout(() => {
                    step1.classList.add('hidden');
                    step2.classList.remove('hidden');
                    updateObStartBtn();
                }, 200);
            });
        }
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (!obSelectedMode || !obSelectedStar) return;
                setLearningMode(obSelectedMode);
                localStorage.setItem('kvoice_default_star', obSelectedStar);
                localStorage.setItem('kvoice_onboarded', 'true');
                overlay.classList.add('hidden');
                pendingStarId = obSelectedStar;
                pendingCustomName = null;
                showNicknameInput();
            });
        }
    }

    function autoSelectDefaultStar() {
        if (localStorage.getItem('kvoice_onboarded') !== 'true') return;
        const defaultStar = localStorage.getItem('kvoice_default_star');
        if (defaultStar && personasList.length > 0) {
            const star = personasList.find(s => s.id === defaultStar);
            if (star) {
                const savedNickname = localStorage.getItem('kvoice_nickname_' + defaultStar);
                if (savedNickname) {
                    const savedGender = localStorage.getItem('kvoice_gender_' + defaultStar) || 'neutral';
                    activateStarWithNickname(defaultStar, null, savedNickname, savedGender);
                } else {
                    pendingStarId = defaultStar;
                    pendingCustomName = null;
                    showNicknameInput();
                }
            }
        }
    }

    initOnboarding();
    setLearningMode(learningMode);
    initAuthUI();
    fetchEnergy();

    const pendingPlan = localStorage.getItem('kagit_pending_premium');
    if (pendingPlan) {
        localStorage.removeItem('kagit_pending_premium');
        if (window.KAGIT_USER && window.KAGIT_USER.id) {
            setTimeout(() => handleGoPremium(pendingPlan, true), 500);
        }
    }

    if (localStorage.getItem('kagit_awaiting_payment')) {
        localStorage.removeItem('kagit_awaiting_payment');
        startPremiumPolling();
    }

    loadHomeData();
});
