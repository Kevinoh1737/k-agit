import random
from .titles import get_all_localized

SENTENCES = [
    {
        "id": 1,
        "text": "네 눈이 처음 나를 봤을 때",
        "source_type": "kpop",
        "source_title": "봄날",
        "source_artist": "BTS",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 2,
        "text": "보고 싶다 이렇게 말하니까 더 보고 싶다",
        "source_type": "kpop",
        "source_title": "봄날",
        "source_artist": "BTS",
        "emotion": "sad",
        "category": "그리움"
    },
    {
        "id": 3,
        "text": "사랑이 어떻게 변하니",
        "source_type": "drama",
        "source_title": "파리의 연인",
        "source_artist": "",
        "emotion": "sad",
        "category": "이별"
    },
    {
        "id": 4,
        "text": "나는 나비 너의 곁에 날아가",
        "source_type": "kpop",
        "source_title": "Butterfly",
        "source_artist": "BTS",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 5,
        "text": "두근두근 널 처음 만난 날",
        "source_type": "kpop",
        "source_title": "TT",
        "source_artist": "TWICE",
        "emotion": "happy",
        "category": "사랑"
    },
    {
        "id": 6,
        "text": "넌 내게 반해 버린 거야",
        "source_type": "kpop",
        "source_title": "Cheer Up",
        "source_artist": "TWICE",
        "emotion": "energetic",
        "category": "사랑"
    },
    {
        "id": 7,
        "text": "그때 우리가 만약 다시 만난다면",
        "source_type": "kpop",
        "source_title": "If We Ever Meet Again",
        "source_artist": "IU",
        "emotion": "sad",
        "category": "그리움"
    },
    {
        "id": 8,
        "text": "좋은 날이야 오늘도",
        "source_type": "kpop",
        "source_title": "좋은 날",
        "source_artist": "IU",
        "emotion": "happy",
        "category": "일상"
    },
    {
        "id": 9,
        "text": "네가 없는 이 거리가 너무 낯설어",
        "source_type": "kpop",
        "source_title": "눈의 꽃",
        "source_artist": "박효신",
        "emotion": "sad",
        "category": "이별"
    },
    {
        "id": 10,
        "text": "하늘을 달리다 별이 되어",
        "source_type": "kpop",
        "source_title": "하늘을 달리다",
        "source_artist": "이적",
        "emotion": "energetic",
        "category": "일상"
    },
    {
        "id": 11,
        "text": "뚜두뚜두 내가 제일 잘 나가",
        "source_type": "kpop",
        "source_title": "뚜두뚜두",
        "source_artist": "BLACKPINK",
        "emotion": "energetic",
        "category": "일상"
    },
    {
        "id": 12,
        "text": "마지막처럼 사랑해 줄래",
        "source_type": "kpop",
        "source_title": "마지막처럼",
        "source_artist": "BLACKPINK",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 13,
        "text": "눈을 감아도 널 느낄 수 있어",
        "source_type": "kpop",
        "source_title": "Love Dive",
        "source_artist": "IVE",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 14,
        "text": "별이 빛나는 밤에 너를 생각해",
        "source_type": "kpop",
        "source_title": "밤편지",
        "source_artist": "IU",
        "emotion": "calm",
        "category": "그리움"
    },
    {
        "id": 15,
        "text": "너의 모든 순간이 나에게는 기적이야",
        "source_type": "kpop",
        "source_title": "기적",
        "source_artist": "EXO",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 16,
        "text": "이 밤 그날의 반딧불을 당신의 창가에 보낼게요",
        "source_type": "kpop",
        "source_title": "밤편지",
        "source_artist": "IU",
        "emotion": "calm",
        "category": "사랑"
    },
    {
        "id": 17,
        "text": "사랑은 늘 도망가",
        "source_type": "kpop",
        "source_title": "사랑은 늘 도망가",
        "source_artist": "임영웅",
        "emotion": "sad",
        "category": "이별"
    },
    {
        "id": 18,
        "text": "나 하나만 보고 따라와",
        "source_type": "kpop",
        "source_title": "Follow",
        "source_artist": "몬스타엑스",
        "emotion": "energetic",
        "category": "일상"
    },
    {
        "id": 19,
        "text": "거짓말이라도 해줘 떠나지 않는다고",
        "source_type": "kpop",
        "source_title": "거짓말",
        "source_artist": "BIGBANG",
        "emotion": "sad",
        "category": "이별"
    },
    {
        "id": 20,
        "text": "오늘부터 우리는 연인이 되는 거야",
        "source_type": "drama",
        "source_title": "도깨비",
        "source_artist": "",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 21,
        "text": "첫눈이 오면 나 그대에게 갈게요",
        "source_type": "drama",
        "source_title": "도깨비",
        "source_artist": "",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 22,
        "text": "잘 먹겠습니다",
        "source_type": "drama",
        "source_title": "식샤를 합시다",
        "source_artist": "",
        "emotion": "happy",
        "category": "일상"
    },
    {
        "id": 23,
        "text": "포기하면 편해 그래도 포기하지 마",
        "source_type": "drama",
        "source_title": "응답하라 1988",
        "source_artist": "",
        "emotion": "dramatic",
        "category": "우정"
    },
    {
        "id": 24,
        "text": "어른이 되면 다 괜찮을 줄 알았어",
        "source_type": "drama",
        "source_title": "응답하라 1988",
        "source_artist": "",
        "emotion": "sad",
        "category": "일상"
    },
    {
        "id": 25,
        "text": "나는 괜찮은 사람이니까",
        "source_type": "drama",
        "source_title": "사이코지만 괜찮아",
        "source_artist": "",
        "emotion": "calm",
        "category": "일상"
    },
    {
        "id": 26,
        "text": "진짜 사랑은 아무 조건 없이 하는 거야",
        "source_type": "drama",
        "source_title": "별에서 온 그대",
        "source_artist": "",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 27,
        "text": "죽고 싶지만 떡볶이는 먹고 싶어",
        "source_type": "drama",
        "source_title": "나의 해방일지",
        "source_artist": "",
        "emotion": "calm",
        "category": "일상"
    },
    {
        "id": 28,
        "text": "내가 널 지켜줄게 무슨 일이 있어도",
        "source_type": "drama",
        "source_title": "태양의 후예",
        "source_artist": "",
        "emotion": "dramatic",
        "category": "사랑"
    },
    {
        "id": 29,
        "text": "오늘 뭐 먹지 그게 제일 중요해",
        "source_type": "drama",
        "source_title": "식샤를 합시다",
        "source_artist": "",
        "emotion": "happy",
        "category": "일상"
    },
    {
        "id": 30,
        "text": "우리가 함께한 시간이 꽃이었다",
        "source_type": "drama",
        "source_title": "미스터 션샤인",
        "source_artist": "",
        "emotion": "sad",
        "category": "그리움"
    },
    {
        "id": 31,
        "text": "친구야 오늘도 힘내자",
        "source_type": "drama",
        "source_title": "응답하라 1988",
        "source_artist": "",
        "emotion": "happy",
        "category": "우정"
    },
    {
        "id": 32,
        "text": "이 세상에 나쁜 사람은 없어 다 사정이 있는 거야",
        "source_type": "drama",
        "source_title": "이태원 클라쓰",
        "source_artist": "",
        "emotion": "calm",
        "category": "일상"
    },
    {
        "id": 33,
        "text": "밤새 너만 생각했어",
        "source_type": "kpop",
        "source_title": "밤새",
        "source_artist": "에이핑크",
        "emotion": "romantic",
        "category": "사랑"
    },
    {
        "id": 34,
        "text": "가지 마 가지 마 제발 나를 떠나지 마",
        "source_type": "drama",
        "source_title": "겨울연가",
        "source_artist": "",
        "emotion": "dramatic",
        "category": "이별"
    },
    {
        "id": 35,
        "text": "널 사랑하지 않는 척했어",
        "source_type": "drama",
        "source_title": "사랑의 불시착",
        "source_artist": "",
        "emotion": "sad",
        "category": "사랑"
    },
    {
        "id": 36,
        "text": "우리 다시 만날 수 있을까",
        "source_type": "drama",
        "source_title": "사랑의 불시착",
        "source_artist": "",
        "emotion": "sad",
        "category": "그리움"
    },
    {
        "id": 37,
        "text": "니가 내 맘에 들어왔어",
        "source_type": "kpop",
        "source_title": "Hype Boy",
        "source_artist": "NewJeans",
        "emotion": "happy",
        "category": "사랑"
    },
    {
        "id": 38,
        "text": "꿈에서도 널 그리워해",
        "source_type": "kpop",
        "source_title": "Ditto",
        "source_artist": "NewJeans",
        "emotion": "romantic",
        "category": "그리움"
    },
    {
        "id": 39,
        "text": "꿈이 있다면 절대 포기하지 마",
        "source_type": "drama",
        "source_title": "이태원 클라쓰",
        "source_artist": "",
        "emotion": "dramatic",
        "category": "우정"
    },
    {
        "id": 40,
        "text": "같이 갈래 나랑 산책하러",
        "source_type": "drama",
        "source_title": "김비서가 왜 그럴까",
        "source_artist": "",
        "emotion": "happy",
        "category": "일상"
    },
    {"id": 41, "text": "헐 대박", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 42, "text": "진짜?", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 43, "text": "아 몰라", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 44, "text": "어떡해", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 45, "text": "미쳤어", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 46, "text": "캬 이거 좋다", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 47, "text": "헐 진짜?", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 48, "text": "와 대박이다", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 49, "text": "말이 돼?", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 50, "text": "실화야?", "source_type": "trending", "source_title": "인사/리액션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 51, "text": "너 진짜 잘생겼다", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "사랑"},
    {"id": 52, "text": "너무 예쁘다", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "사랑"},
    {"id": 53, "text": "갓생 살고 있네", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 54, "text": "인정 인정", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 55, "text": "이건 진짜 미쳤다", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 56, "text": "레전드다", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 57, "text": "이거 찐이야", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 58, "text": "킹왕짱이야", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 59, "text": "이거 꿀잼이야", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 60, "text": "완전 핵인싸야", "source_type": "trending", "source_title": "칭찬/감탄", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 61, "text": "이거 맛있겠다", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 62, "text": "이거 진짜 맛있어", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 63, "text": "커피 한 잔 할래?", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 64, "text": "배고파 죽겠어", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 65, "text": "오늘 뭐 먹을까?", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 66, "text": "디저트 먹자", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 67, "text": "이거 JMT야", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 68, "text": "카페 갈래?", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 69, "text": "치맥 하자", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 70, "text": "야식 먹을까?", "source_type": "trending", "source_title": "맛집/카페", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 71, "text": "너무 좋아", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "happy", "category": "사랑"},
    {"id": 72, "text": "심쿵이야", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 73, "text": "설레", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 74, "text": "짜증나", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 75, "text": "우울해", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 76, "text": "힘들다", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 77, "text": "행복해", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 78, "text": "감동이야", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "romantic", "category": "일상"},
    {"id": 79, "text": "외로워", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "sad", "category": "그리움"},
    {"id": 80, "text": "두근두근해", "source_type": "trending", "source_title": "감정 표현", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 81, "text": "셀카 찍자", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 82, "text": "사진 찍어줘", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 83, "text": "여기 완전 핫플이야", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 84, "text": "인스타 올려야지", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 85, "text": "좋아요 눌러줘", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 86, "text": "스토리 올릴까?", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 87, "text": "이거 대박 예쁘다", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 88, "text": "필터 뭐 쓴 거야?", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 89, "text": "태그해줘", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 90, "text": "팔로우 해줘", "source_type": "trending", "source_title": "SNS/셀카", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 91, "text": "이거 얼마예요?", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 92, "text": "너무 비싸", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 93, "text": "할인 있어요?", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 94, "text": "이거 예쁘다", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 95, "text": "어디서 샀어?", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 96, "text": "사이즈 있어요?", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 97, "text": "이거 잘 어울려", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 98, "text": "신상이야", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 99, "text": "득템했어", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 100, "text": "가성비 좋다", "source_type": "trending", "source_title": "쇼핑/패션", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 101, "text": "오늘 뭐 해?", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 102, "text": "놀자!", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "energetic", "category": "우정"},
    {"id": 103, "text": "어디서 만날까?", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 104, "text": "늦을 것 같아", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 105, "text": "먼저 가", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "calm", "category": "우정"},
    {"id": 106, "text": "잠깐만 기다려줘", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 107, "text": "같이 가자", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 108, "text": "오늘 재밌었어", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 109, "text": "다음에 또 만나", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "happy", "category": "우정"},
    {"id": 110, "text": "잘 들어가", "source_type": "trending", "source_title": "친구/약속", "source_artist": "", "emotion": "calm", "category": "우정"},
    {"id": 111, "text": "좋아해", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 112, "text": "보고 싶어", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "그리움"},
    {"id": 113, "text": "너 때문에 웃게 돼", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 114, "text": "우리 사귀는 거야?", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 115, "text": "심쿵했어", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 116, "text": "첫눈에 반했어", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 117, "text": "내 스타일이야", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "happy", "category": "사랑"},
    {"id": 118, "text": "연락해", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "calm", "category": "사랑"},
    {"id": 119, "text": "데이트 할까?", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 120, "text": "너만 생각나", "source_type": "trending", "source_title": "연애/썸", "source_artist": "", "emotion": "romantic", "category": "그리움"},
    {"id": 121, "text": "오늘도 힘내자", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 122, "text": "퇴근하고 싶다", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 123, "text": "월급 루팡하고 싶다", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 124, "text": "야근이야", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 125, "text": "시험 망했어", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 126, "text": "과제 다 했어?", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 127, "text": "점심 뭐 먹지?", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 128, "text": "회의 몇 시야?", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 129, "text": "수고했어", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 130, "text": "내일 봐", "source_type": "trending", "source_title": "직장/학교", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 131, "text": "갓생 살자", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 132, "text": "소확행이야", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 133, "text": "오늘 플렉스 할까?", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 134, "text": "TMI인데", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 135, "text": "MBTI 뭐야?", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 136, "text": "가보자고!", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 137, "text": "어쩔티비", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 138, "text": "이건 JMT다", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 139, "text": "오운완 했어", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 140, "text": "할많하않", "source_type": "trending", "source_title": "유행어/밈", "source_artist": "", "emotion": "calm", "category": "일상"},

    {"id": 141, "text": "추운 겨울 끝을 지나 봄날이 올 때까지", "source_type": "kpop", "source_title": "봄날", "source_artist": "BTS", "emotion": "sad", "category": "그리움"},
    {"id": 142, "text": "허공을 떠도는 작은 먼지처럼", "source_type": "kpop", "source_title": "봄날", "source_artist": "BTS", "emotion": "sad", "category": "그리움"},
    {"id": 259, "text": "그리움들이 얼마나 눈처럼 내려야", "source_type": "kpop", "source_title": "봄날", "source_artist": "BTS", "emotion": "sad", "category": "그리움"},

    {"id": 143, "text": "꿈을 꾸듯이 너에게 날아가", "source_type": "kpop", "source_title": "Butterfly", "source_artist": "BTS", "emotion": "romantic", "category": "사랑"},
    {"id": 144, "text": "이 순간이 지나면 없었던 일이 될까", "source_type": "kpop", "source_title": "Butterfly", "source_artist": "BTS", "emotion": "sad", "category": "그리움"},
    {"id": 145, "text": "부서질 것처럼 아름다운 너", "source_type": "kpop", "source_title": "Butterfly", "source_artist": "BTS", "emotion": "romantic", "category": "사랑"},
    {"id": 146, "text": "내 손을 잡아 절대 놓지 마", "source_type": "kpop", "source_title": "Butterfly", "source_artist": "BTS", "emotion": "dramatic", "category": "사랑"},

    {"id": 147, "text": "한번만 안아주면 안 돼?", "source_type": "kpop", "source_title": "TT", "source_artist": "TWICE", "emotion": "sad", "category": "사랑"},
    {"id": 148, "text": "울어야 할지 웃어야 할지 모르겠어", "source_type": "kpop", "source_title": "TT", "source_artist": "TWICE", "emotion": "sad", "category": "일상"},
    {"id": 149, "text": "날 보면 웃어줘 제발", "source_type": "kpop", "source_title": "TT", "source_artist": "TWICE", "emotion": "romantic", "category": "사랑"},
    {"id": 150, "text": "왜 자꾸 혼자 있으면 눈물이 나", "source_type": "kpop", "source_title": "TT", "source_artist": "TWICE", "emotion": "sad", "category": "이별"},

    {"id": 151, "text": "샤샤샤 그렇게 빠져들어", "source_type": "kpop", "source_title": "Cheer Up", "source_artist": "TWICE", "emotion": "energetic", "category": "사랑"},
    {"id": 152, "text": "너의 관심을 끌고 싶어", "source_type": "kpop", "source_title": "Cheer Up", "source_artist": "TWICE", "emotion": "romantic", "category": "사랑"},
    {"id": 153, "text": "매일 매일 나를 떠올려줘", "source_type": "kpop", "source_title": "Cheer Up", "source_artist": "TWICE", "emotion": "happy", "category": "사랑"},
    {"id": 154, "text": "전화 좀 해줘 하루에 한 번은", "source_type": "kpop", "source_title": "Cheer Up", "source_artist": "TWICE", "emotion": "happy", "category": "사랑"},

    {"id": 155, "text": "너와 다시 만날 그날까지", "source_type": "kpop", "source_title": "If We Ever Meet Again", "source_artist": "IU", "emotion": "sad", "category": "그리움"},
    {"id": 156, "text": "잊을 수 없는 너의 미소", "source_type": "kpop", "source_title": "If We Ever Meet Again", "source_artist": "IU", "emotion": "romantic", "category": "그리움"},
    {"id": 157, "text": "시간이 지나도 너는 그대로야", "source_type": "kpop", "source_title": "If We Ever Meet Again", "source_artist": "IU", "emotion": "calm", "category": "사랑"},
    {"id": 158, "text": "우연이라도 좋으니 다시 만나자", "source_type": "kpop", "source_title": "If We Ever Meet Again", "source_artist": "IU", "emotion": "sad", "category": "그리움"},

    {"id": 159, "text": "기분이 좋아지는 하루야", "source_type": "kpop", "source_title": "좋은 날", "source_artist": "IU", "emotion": "happy", "category": "일상"},
    {"id": 160, "text": "오늘 같은 날엔 웃어야 해", "source_type": "kpop", "source_title": "좋은 날", "source_artist": "IU", "emotion": "happy", "category": "일상"},
    {"id": 161, "text": "눈물이 왜 나는지 모르겠어", "source_type": "kpop", "source_title": "좋은 날", "source_artist": "IU", "emotion": "sad", "category": "이별"},
    {"id": 162, "text": "이런 좋은 날 너를 만났어", "source_type": "kpop", "source_title": "좋은 날", "source_artist": "IU", "emotion": "happy", "category": "사랑"},

    {"id": 163, "text": "사랑해 널 이렇게 불러본다", "source_type": "kpop", "source_title": "눈의 꽃", "source_artist": "박효신", "emotion": "romantic", "category": "사랑"},
    {"id": 164, "text": "눈처럼 내려와 내 마음을 녹여줘", "source_type": "kpop", "source_title": "눈의 꽃", "source_artist": "박효신", "emotion": "romantic", "category": "사랑"},
    {"id": 165, "text": "흩날리는 눈꽃처럼 너에게 다가갈게", "source_type": "kpop", "source_title": "눈의 꽃", "source_artist": "박효신", "emotion": "romantic", "category": "사랑"},
    {"id": 166, "text": "너를 향한 이 마음은 변하지 않아", "source_type": "kpop", "source_title": "눈의 꽃", "source_artist": "박효신", "emotion": "calm", "category": "사랑"},

    {"id": 167, "text": "달려라 더 높이 날아올라", "source_type": "kpop", "source_title": "하늘을 달리다", "source_artist": "이적", "emotion": "energetic", "category": "일상"},
    {"id": 168, "text": "세상 끝까지 함께 가자", "source_type": "kpop", "source_title": "하늘을 달리다", "source_artist": "이적", "emotion": "energetic", "category": "우정"},
    {"id": 169, "text": "두려워하지 마 네 꿈을 향해", "source_type": "kpop", "source_title": "하늘을 달리다", "source_artist": "이적", "emotion": "energetic", "category": "일상"},
    {"id": 170, "text": "바람을 타고 자유롭게 날아가", "source_type": "kpop", "source_title": "하늘을 달리다", "source_artist": "이적", "emotion": "calm", "category": "일상"},

    {"id": 171, "text": "날 막을 수 없어 아무도", "source_type": "kpop", "source_title": "뚜두뚜두", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "일상"},
    {"id": 172, "text": "우리는 멈추지 않아", "source_type": "kpop", "source_title": "뚜두뚜두", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "일상"},
    {"id": 173, "text": "세상이 나를 보고 있어", "source_type": "kpop", "source_title": "뚜두뚜두", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "일상"},
    {"id": 174, "text": "나는 누구보다 강해", "source_type": "kpop", "source_title": "뚜두뚜두", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "일상"},

    {"id": 175, "text": "오늘이 마지막인 것처럼 사랑하자", "source_type": "kpop", "source_title": "마지막처럼", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "사랑"},
    {"id": 176, "text": "너와 함께라면 두렵지 않아", "source_type": "kpop", "source_title": "마지막처럼", "source_artist": "BLACKPINK", "emotion": "romantic", "category": "사랑"},
    {"id": 177, "text": "이 순간을 영원히 기억할게", "source_type": "kpop", "source_title": "마지막처럼", "source_artist": "BLACKPINK", "emotion": "romantic", "category": "사랑"},
    {"id": 178, "text": "후회 없이 뜨겁게 살고 싶어", "source_type": "kpop", "source_title": "마지막처럼", "source_artist": "BLACKPINK", "emotion": "energetic", "category": "일상"},

    {"id": 179, "text": "네 안에 빠져들어 헤어나올 수 없어", "source_type": "kpop", "source_title": "Love Dive", "source_artist": "IVE", "emotion": "romantic", "category": "사랑"},
    {"id": 180, "text": "사랑에 빠지는 건 한순간이야", "source_type": "kpop", "source_title": "Love Dive", "source_artist": "IVE", "emotion": "romantic", "category": "사랑"},
    {"id": 181, "text": "너라는 바다에 뛰어들어", "source_type": "kpop", "source_title": "Love Dive", "source_artist": "IVE", "emotion": "energetic", "category": "사랑"},
    {"id": 182, "text": "이건 운명이야 느낄 수 있어", "source_type": "kpop", "source_title": "Love Dive", "source_artist": "IVE", "emotion": "romantic", "category": "사랑"},

    {"id": 183, "text": "밤하늘의 별처럼 빛나는 너", "source_type": "kpop", "source_title": "밤편지", "source_artist": "IU", "emotion": "calm", "category": "사랑"},
    {"id": 184, "text": "잠들기 전 너에게 보내는 편지야", "source_type": "kpop", "source_title": "밤편지", "source_artist": "IU", "emotion": "calm", "category": "사랑"},
    {"id": 260, "text": "어둠 속에서도 너는 빛나고 있어", "source_type": "kpop", "source_title": "밤편지", "source_artist": "IU", "emotion": "romantic", "category": "사랑"},

    {"id": 185, "text": "네가 있어 매일이 기적이야", "source_type": "kpop", "source_title": "기적", "source_artist": "EXO", "emotion": "romantic", "category": "사랑"},
    {"id": 186, "text": "하늘이 내려준 선물 같은 너", "source_type": "kpop", "source_title": "기적", "source_artist": "EXO", "emotion": "romantic", "category": "사랑"},
    {"id": 187, "text": "너와 함께하는 시간이 제일 좋아", "source_type": "kpop", "source_title": "기적", "source_artist": "EXO", "emotion": "happy", "category": "사랑"},
    {"id": 188, "text": "천 번을 다시 태어나도 너를 사랑해", "source_type": "kpop", "source_title": "기적", "source_artist": "EXO", "emotion": "dramatic", "category": "사랑"},

    {"id": 189, "text": "잡을 수 없는 사랑은 아프다", "source_type": "kpop", "source_title": "사랑은 늘 도망가", "source_artist": "임영웅", "emotion": "sad", "category": "이별"},
    {"id": 190, "text": "돌아와 줘 내 곁에 있어줘", "source_type": "kpop", "source_title": "사랑은 늘 도망가", "source_artist": "임영웅", "emotion": "sad", "category": "이별"},
    {"id": 191, "text": "너 없는 하루가 이렇게 길 줄 몰랐어", "source_type": "kpop", "source_title": "사랑은 늘 도망가", "source_artist": "임영웅", "emotion": "sad", "category": "그리움"},
    {"id": 192, "text": "사랑아 제발 도망가지 마", "source_type": "kpop", "source_title": "사랑은 늘 도망가", "source_artist": "임영웅", "emotion": "dramatic", "category": "사랑"},

    {"id": 193, "text": "내 뒤에 서지 마 옆에 서", "source_type": "kpop", "source_title": "Follow", "source_artist": "몬스타엑스", "emotion": "energetic", "category": "일상"},
    {"id": 194, "text": "멈추지 마 계속 달려", "source_type": "kpop", "source_title": "Follow", "source_artist": "몬스타엑스", "emotion": "energetic", "category": "일상"},
    {"id": 195, "text": "두려움을 버려 나를 믿어", "source_type": "kpop", "source_title": "Follow", "source_artist": "몬스타엑스", "emotion": "energetic", "category": "우정"},
    {"id": 196, "text": "같이 가면 무섭지 않아", "source_type": "kpop", "source_title": "Follow", "source_artist": "몬스타엑스", "emotion": "happy", "category": "우정"},

    {"id": 197, "text": "사랑했던 만큼 미워했어", "source_type": "kpop", "source_title": "거짓말", "source_artist": "BIGBANG", "emotion": "sad", "category": "이별"},
    {"id": 198, "text": "너 없이 살 수 있을까", "source_type": "kpop", "source_title": "거짓말", "source_artist": "BIGBANG", "emotion": "sad", "category": "이별"},
    {"id": 199, "text": "아파도 웃어야 해", "source_type": "kpop", "source_title": "거짓말", "source_artist": "BIGBANG", "emotion": "sad", "category": "이별"},
    {"id": 200, "text": "이제 진짜 보내줄게", "source_type": "kpop", "source_title": "거짓말", "source_artist": "BIGBANG", "emotion": "dramatic", "category": "이별"},

    {"id": 201, "text": "밤새도록 너를 그려봐", "source_type": "kpop", "source_title": "밤새", "source_artist": "에이핑크", "emotion": "romantic", "category": "사랑"},
    {"id": 202, "text": "눈을 감으면 너만 보여", "source_type": "kpop", "source_title": "밤새", "source_artist": "에이핑크", "emotion": "romantic", "category": "그리움"},
    {"id": 203, "text": "오늘 밤도 잠이 오지 않아", "source_type": "kpop", "source_title": "밤새", "source_artist": "에이핑크", "emotion": "calm", "category": "그리움"},
    {"id": 204, "text": "새벽이 와도 너를 잊을 수 없어", "source_type": "kpop", "source_title": "밤새", "source_artist": "에이핑크", "emotion": "sad", "category": "그리움"},

    {"id": 205, "text": "너한테 빠진 것 같아", "source_type": "kpop", "source_title": "Hype Boy", "source_artist": "NewJeans", "emotion": "happy", "category": "사랑"},
    {"id": 206, "text": "자꾸만 네 생각이 나", "source_type": "kpop", "source_title": "Hype Boy", "source_artist": "NewJeans", "emotion": "romantic", "category": "사랑"},
    {"id": 207, "text": "너를 좋아하는 게 이상한 건가", "source_type": "kpop", "source_title": "Hype Boy", "source_artist": "NewJeans", "emotion": "happy", "category": "사랑"},
    {"id": 208, "text": "매일 보고 싶은 사람이 생겼어", "source_type": "kpop", "source_title": "Hype Boy", "source_artist": "NewJeans", "emotion": "romantic", "category": "사랑"},

    {"id": 209, "text": "같은 시간 같은 자리에서 너를 기다려", "source_type": "kpop", "source_title": "Ditto", "source_artist": "NewJeans", "emotion": "romantic", "category": "그리움"},
    {"id": 210, "text": "나도 너와 같은 마음이야", "source_type": "kpop", "source_title": "Ditto", "source_artist": "NewJeans", "emotion": "romantic", "category": "사랑"},
    {"id": 211, "text": "이 감정이 사랑인지 모르겠어", "source_type": "kpop", "source_title": "Ditto", "source_artist": "NewJeans", "emotion": "calm", "category": "사랑"},
    {"id": 212, "text": "너와 나 같은 꿈을 꾸고 있어", "source_type": "kpop", "source_title": "Ditto", "source_artist": "NewJeans", "emotion": "romantic", "category": "그리움"},

    {"id": 213, "text": "이 사랑은 변하지 않을 거야", "source_type": "drama", "source_title": "도깨비", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 214, "text": "비가 오면 너를 떠올려", "source_type": "drama", "source_title": "도깨비", "source_artist": "", "emotion": "sad", "category": "그리움"},
    {"id": 215, "text": "나와 함께해 줄래?", "source_type": "drama", "source_title": "도깨비", "source_artist": "", "emotion": "romantic", "category": "사랑"},

    {"id": 216, "text": "사랑이 뭔지 이제야 알았어", "source_type": "drama", "source_title": "파리의 연인", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 217, "text": "너를 만나서 나는 변했어", "source_type": "drama", "source_title": "파리의 연인", "source_artist": "", "emotion": "calm", "category": "사랑"},
    {"id": 218, "text": "이미 돌이킬 수 없는 마음이야", "source_type": "drama", "source_title": "파리의 연인", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 219, "text": "행복하게 해줄게 약속할게", "source_type": "drama", "source_title": "파리의 연인", "source_artist": "", "emotion": "romantic", "category": "사랑"},

    {"id": 220, "text": "맛있게 먹는 게 제일 좋아", "source_type": "drama", "source_title": "식샤를 합시다", "source_artist": "", "emotion": "happy", "category": "일상"},
    {"id": 221, "text": "밥이 보약이야", "source_type": "drama", "source_title": "식샤를 합시다", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 222, "text": "같이 먹으면 더 맛있어", "source_type": "drama", "source_title": "식샤를 합시다", "source_artist": "", "emotion": "happy", "category": "우정"},

    {"id": 223, "text": "사람이 먼저다", "source_type": "drama", "source_title": "응답하라 1988", "source_artist": "", "emotion": "calm", "category": "우정"},
    {"id": 224, "text": "늦더라도 가는 게 중요해", "source_type": "drama", "source_title": "응답하라 1988", "source_artist": "", "emotion": "calm", "category": "일상"},

    {"id": 225, "text": "괜찮지 않아도 괜찮아", "source_type": "drama", "source_title": "사이코지만 괜찮아", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 226, "text": "상처받은 마음도 치유될 수 있어", "source_type": "drama", "source_title": "사이코지만 괜찮아", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 227, "text": "네가 나를 변하게 했어", "source_type": "drama", "source_title": "사이코지만 괜찮아", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 228, "text": "행복해지는 법을 배우고 싶어", "source_type": "drama", "source_title": "사이코지만 괜찮아", "source_artist": "", "emotion": "calm", "category": "일상"},

    {"id": 229, "text": "별에서 온 당신을 사랑합니다", "source_type": "drama", "source_title": "별에서 온 그대", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 230, "text": "이 세상에서 너만큼 소중한 건 없어", "source_type": "drama", "source_title": "별에서 온 그대", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 231, "text": "시간이 멈추면 좋겠어", "source_type": "drama", "source_title": "별에서 온 그대", "source_artist": "", "emotion": "sad", "category": "그리움"},
    {"id": 232, "text": "널 만난 건 기적이야", "source_type": "drama", "source_title": "별에서 온 그대", "source_artist": "", "emotion": "romantic", "category": "사랑"},

    {"id": 233, "text": "살아있으니까 먹어야지", "source_type": "drama", "source_title": "나의 해방일지", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 234, "text": "해방되고 싶어 이 모든 것에서", "source_type": "drama", "source_title": "나의 해방일지", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 235, "text": "작은 행복이라도 찾아야지", "source_type": "drama", "source_title": "나의 해방일지", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 236, "text": "오늘 하루도 잘 버텼다", "source_type": "drama", "source_title": "나의 해방일지", "source_artist": "", "emotion": "calm", "category": "일상"},

    {"id": 237, "text": "사랑하는 사람을 지키는 게 군인이야", "source_type": "drama", "source_title": "태양의 후예", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 238, "text": "돌아올게 반드시 돌아올게", "source_type": "drama", "source_title": "태양의 후예", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 239, "text": "기다려줘 꼭 살아서 돌아갈게", "source_type": "drama", "source_title": "태양의 후예", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 240, "text": "당신이 있어 나는 용기가 생겨", "source_type": "drama", "source_title": "태양의 후예", "source_artist": "", "emotion": "romantic", "category": "사랑"},

    {"id": 241, "text": "꽃이 진다고 슬퍼하지 마라", "source_type": "drama", "source_title": "미스터 션샤인", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 242, "text": "이 나라를 위해 싸우겠습니다", "source_type": "drama", "source_title": "미스터 션샤인", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 243, "text": "아름다운 것은 모두 아프다", "source_type": "drama", "source_title": "미스터 션샤인", "source_artist": "", "emotion": "sad", "category": "일상"},
    {"id": 244, "text": "당신의 이름을 기억하겠습니다", "source_type": "drama", "source_title": "미스터 션샤인", "source_artist": "", "emotion": "dramatic", "category": "그리움"},

    {"id": 245, "text": "겨울이 오면 너를 생각할게", "source_type": "drama", "source_title": "겨울연가", "source_artist": "", "emotion": "sad", "category": "그리움"},
    {"id": 246, "text": "첫사랑은 잊을 수 없어", "source_type": "drama", "source_title": "겨울연가", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 247, "text": "다시 만나도 널 사랑할 거야", "source_type": "drama", "source_title": "겨울연가", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 248, "text": "너 없는 겨울은 너무 추워", "source_type": "drama", "source_title": "겨울연가", "source_artist": "", "emotion": "sad", "category": "이별"},

    {"id": 249, "text": "당신이 있는 곳이 나의 집이야", "source_type": "drama", "source_title": "사랑의 불시착", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 250, "text": "국경을 넘어서라도 너에게 갈게", "source_type": "drama", "source_title": "사랑의 불시착", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 251, "text": "위험해도 좋으니 함께 있고 싶어", "source_type": "drama", "source_title": "사랑의 불시착", "source_artist": "", "emotion": "romantic", "category": "사랑"},

    {"id": 252, "text": "밤은 길어도 꿈은 짧다", "source_type": "drama", "source_title": "이태원 클라쓰", "source_artist": "", "emotion": "dramatic", "category": "일상"},
    {"id": 253, "text": "나는 내 방식대로 살 거야", "source_type": "drama", "source_title": "이태원 클라쓰", "source_artist": "", "emotion": "energetic", "category": "일상"},
    {"id": 254, "text": "실패해도 다시 일어나면 돼", "source_type": "drama", "source_title": "이태원 클라쓰", "source_artist": "", "emotion": "energetic", "category": "일상"},

    {"id": 255, "text": "가만히 있으면 아무 일도 안 일어나", "source_type": "drama", "source_title": "김비서가 왜 그럴까", "source_artist": "", "emotion": "calm", "category": "일상"},
    {"id": 256, "text": "나 없이도 잘 할 수 있어?", "source_type": "drama", "source_title": "김비서가 왜 그럴까", "source_artist": "", "emotion": "dramatic", "category": "사랑"},
    {"id": 257, "text": "내가 왜 이렇게 설레는 거지?", "source_type": "drama", "source_title": "김비서가 왜 그럴까", "source_artist": "", "emotion": "romantic", "category": "사랑"},
    {"id": 258, "text": "너 때문에 이상해진 것 같아", "source_type": "drama", "source_title": "김비서가 왜 그럴까", "source_artist": "", "emotion": "romantic", "category": "사랑"},
]

CATEGORIES = sorted(set(s["category"] for s in SENTENCES))


def _enrich_sentence(s):
    localized = get_all_localized(s['source_title'])
    enriched = dict(s)
    enriched['localized_titles'] = localized['titles']
    enriched['localized_artists'] = localized['artists']
    return enriched


def get_all_sentences(category=None):
    if category and category != "전체":
        return [_enrich_sentence(s) for s in SENTENCES if s["category"] == category]
    return [_enrich_sentence(s) for s in SENTENCES]


def get_by_category(category):
    return [_enrich_sentence(s) for s in SENTENCES if s["category"] == category]


def get_random_sentence(category=None):
    pool = get_all_sentences(category)
    if not pool:
        return None
    return random.choice(pool)


def get_categories():
    return CATEGORIES


def get_grouped_sentences():
    groups = {}
    for s in SENTENCES:
        key = f"{s['source_type']}_{s['source_title']}"
        if key not in groups:
            localized = get_all_localized(s['source_title'])
            groups[key] = {
                "source_type": s["source_type"],
                "source_title": s["source_title"],
                "source_artist": s.get("source_artist", ""),
                "emotion": s.get("emotion", ""),
                "localized_titles": localized['titles'],
                "localized_artists": localized['artists'],
                "card_image": localized['card_image'],
                "sentences": []
            }
        groups[key]["sentences"].append(s)

    kpop = [g for g in groups.values() if g["source_type"] == "kpop"]
    drama = [g for g in groups.values() if g["source_type"] == "drama"]
    trending = [g for g in groups.values() if g["source_type"] == "trending"]

    return {"kpop": kpop, "drama": drama, "trending": trending}
