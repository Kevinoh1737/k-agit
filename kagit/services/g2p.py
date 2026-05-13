INITIALS = {
    'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
    'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
    'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
    'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
}

VOWELS = {
    'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
    'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
    'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
    'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
    'ㅣ': 'i'
}

FINALS = {
    '': '', 'ㄱ': 'k', 'ㄲ': 'k', 'ㄳ': 'k', 'ㄴ': 'n',
    'ㄵ': 'n', 'ㄶ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㄺ': 'k',
    'ㄻ': 'm', 'ㄼ': 'l', 'ㄽ': 'l', 'ㄾ': 'l', 'ㄿ': 'l',
    'ㅀ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅄ': 'p', 'ㅅ': 't',
    'ㅆ': 't', 'ㅇ': 'ng', 'ㅈ': 't', 'ㅊ': 't', 'ㅋ': 'k',
    'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 't'
}

FINAL_LIST = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
    'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

INITIAL_LIST = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

VOWEL_LIST = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
    'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]

DOUBLE_FINAL = {
    'ㄳ': ('ㄱ', 'ㅅ'), 'ㄵ': ('ㄴ', 'ㅈ'), 'ㄶ': ('ㄴ', 'ㅎ'),
    'ㄺ': ('ㄹ', 'ㄱ'), 'ㄻ': ('ㄹ', 'ㅁ'), 'ㄼ': ('ㄹ', 'ㅂ'),
    'ㄽ': ('ㄹ', 'ㅅ'), 'ㄾ': ('ㄹ', 'ㅌ'), 'ㄿ': ('ㄹ', 'ㅍ'),
    'ㅀ': ('ㄹ', 'ㅎ'), 'ㅄ': ('ㅂ', 'ㅅ')
}

ASPIRATED = {'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ'}

FORTIS_MAP = {'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ'}

FORTIS_TRIGGER = {
    'ㄱ', 'ㄲ', 'ㄳ', 'ㄺ', 'ㄷ', 'ㅅ', 'ㅆ',
    'ㅂ', 'ㅄ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ'
}

NASAL_MAP = {
    'ㄱ': 'ㅇ', 'ㄲ': 'ㅇ', 'ㅋ': 'ㅇ',
    'ㄷ': 'ㄴ', 'ㅅ': 'ㄴ', 'ㅆ': 'ㄴ', 'ㅈ': 'ㄴ',
    'ㅊ': 'ㄴ', 'ㅌ': 'ㄴ', 'ㅎ': 'ㄴ',
    'ㅂ': 'ㅁ', 'ㅍ': 'ㅁ'
}

CODA_NORMALIZE = {
    'ㄱ': 'ㄱ', 'ㄲ': 'ㄱ', 'ㅋ': 'ㄱ', 'ㄳ': 'ㄱ', 'ㄺ': 'ㄱ',
    'ㄴ': 'ㄴ', 'ㄵ': 'ㄴ', 'ㄶ': 'ㄴ',
    'ㄷ': 'ㄷ', 'ㅅ': 'ㄷ', 'ㅆ': 'ㄷ', 'ㅈ': 'ㄷ', 'ㅊ': 'ㄷ', 'ㅌ': 'ㄷ', 'ㅎ': 'ㄷ',
    'ㄹ': 'ㄹ', 'ㄻ': 'ㅁ', 'ㄼ': 'ㄹ', 'ㄽ': 'ㄹ', 'ㄾ': 'ㄹ', 'ㄿ': 'ㄹ', 'ㅀ': 'ㄹ',
    'ㅁ': 'ㅁ',
    'ㅂ': 'ㅂ', 'ㅍ': 'ㅂ', 'ㅄ': 'ㅂ',
    'ㅇ': 'ㅇ',
}


def decompose(char):
    code = ord(char) - 0xAC00
    if code < 0 or code > 11171:
        return None
    initial = code // (21 * 28)
    vowel = (code % (21 * 28)) // 28
    final = code % 28
    return (INITIAL_LIST[initial], VOWEL_LIST[vowel], FINAL_LIST[final])


def is_hangul(char):
    return 0xAC00 <= ord(char) <= 0xD7A3


def decompose_text(text):
    result = []
    for char in text:
        if is_hangul(char):
            d = decompose(char)
            if d:
                result.append(d)
            else:
                result.append(char)
        else:
            result.append(char)
    return result


def _get_pair(result, i):
    if not isinstance(result[i], tuple):
        return None
    if i + 1 >= len(result) or not isinstance(result[i + 1], tuple):
        return None
    return result[i], result[i + 1]


DOUBLE_FINAL_KEEP_RIGHT = {'ㄺ', 'ㄻ'}

def _resolve_double_final_consonant(fin, next_ini):
    left, right = DOUBLE_FINAL[fin]
    if next_ini == 'ㅇ':
        return left, right
    if fin in DOUBLE_FINAL_KEEP_RIGHT and next_ini != 'ㄱ':
        return right, None
    return left, None

def apply_double_final(result):
    for i in range(len(result)):
        if not isinstance(result[i], tuple):
            continue
        ini, vow, fin = result[i]
        if fin not in DOUBLE_FINAL:
            continue
        left, right = DOUBLE_FINAL[fin]
        has_next = i + 1 < len(result) and isinstance(result[i + 1], tuple)
        if has_next:
            next_ini, next_vow, next_fin = result[i + 1]
            if right == 'ㅎ' and next_ini == 'ㅇ':
                result[i] = (ini, vow, left)
                result[i + 1] = ('ㅇ', next_vow, next_fin)
            elif right == 'ㅎ' and next_ini in ASPIRATED:
                result[i] = (ini, vow, left)
                result[i + 1] = (ASPIRATED[next_ini], next_vow, next_fin)
            elif next_ini == 'ㅇ':
                result[i] = (ini, vow, left)
                result[i + 1] = (right, next_vow, next_fin)
            elif next_ini == 'ㅎ' and right in ASPIRATED:
                result[i] = (ini, vow, left)
                result[i + 1] = (ASPIRATED[right], next_vow, next_fin)
            else:
                keep, _ = _resolve_double_final_consonant(fin, next_ini)
                result[i] = (ini, vow, keep)
        else:
            if fin in DOUBLE_FINAL_KEEP_RIGHT:
                left, right = DOUBLE_FINAL[fin]
                result[i] = (ini, vow, right)
            else:
                result[i] = (ini, vow, left)
    return result


def apply_palatalization(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if fin in ('ㄷ', 'ㅌ') and next_ini == 'ㅇ' and next_vow == 'ㅣ':
            new_ini = 'ㅈ' if fin == 'ㄷ' else 'ㅊ'
            result[i] = (ini, vow, '')
            result[i + 1] = (new_ini, next_vow, next_fin)
    return result


def apply_h_aspiration(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if fin == 'ㅎ' and next_ini in ASPIRATED:
            result[i] = (ini, vow, '')
            result[i + 1] = (ASPIRATED[next_ini], next_vow, next_fin)
        elif fin == 'ㅎ' and next_ini == 'ㅇ':
            result[i] = (ini, vow, '')
        elif fin in ASPIRATED and next_ini == 'ㅎ':
            result[i] = (ini, vow, '')
            result[i + 1] = (ASPIRATED[fin], next_vow, next_fin)
    return result


def apply_liaison(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if fin and next_ini == 'ㅇ':
            result[i] = (ini, vow, '')
            result[i + 1] = (fin, next_vow, next_fin)
    return result


def apply_nasalization(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if not fin:
            continue
        if next_ini in ('ㄴ', 'ㅁ'):
            normalized = CODA_NORMALIZE.get(fin, fin)
            nasal = NASAL_MAP.get(normalized)
            if nasal:
                result[i] = (ini, vow, nasal)
    return result


def apply_liquidization(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if fin == 'ㄹ' and next_ini == 'ㄴ':
            result[i + 1] = ('ㄹ', next_vow, next_fin)
        elif fin == 'ㄴ' and next_ini == 'ㄹ':
            result[i] = (ini, vow, 'ㄹ')
    return result


def apply_fortition(result):
    for i in range(len(result)):
        pair = _get_pair(result, i)
        if not pair:
            continue
        (ini, vow, fin), (next_ini, next_vow, next_fin) = pair
        if fin in FORTIS_TRIGGER and next_ini in FORTIS_MAP:
            result[i + 1] = (FORTIS_MAP[next_ini], next_vow, next_fin)
    return result


def apply_coda_normalization(result):
    for i in range(len(result)):
        if not isinstance(result[i], tuple):
            continue
        ini, vow, fin = result[i]
        if fin and fin in CODA_NORMALIZE:
            has_next = i + 1 < len(result) and isinstance(result[i + 1], tuple)
            if not has_next:
                result[i] = (ini, vow, CODA_NORMALIZE[fin])
    return result


def apply_phonological_rules(syllables):
    result = list(syllables)
    result = apply_double_final(result)
    result = apply_palatalization(result)
    result = apply_h_aspiration(result)
    result = apply_liaison(result)
    result = apply_nasalization(result)
    result = apply_liquidization(result)
    result = apply_fortition(result)
    result = apply_coda_normalization(result)
    return result


def syllable_to_phonetic(ini, vow, fin):
    return INITIALS.get(ini, '') + VOWELS.get(vow, '') + FINALS.get(fin, '')


def syllables_to_phonetic(syllables):
    parts = []
    for item in syllables:
        if isinstance(item, tuple):
            ini, vow, fin = item
            parts.append(syllable_to_phonetic(ini, vow, fin))
        elif item == ' ':
            parts.append(' ')
        else:
            parts.append(item)

    result_tokens = []
    for part in parts:
        if part == ' ':
            result_tokens.append(' ')
        else:
            result_tokens.append(part)

    output = []
    for i, token in enumerate(result_tokens):
        if token == ' ':
            output.append(' ')
        else:
            if output and output[-1] != ' ':
                output.append('-')
            output.append(token)

    return ''.join(output)


def korean_g2p(text):
    words = []
    current_word = []

    for char in text:
        if char == ' ':
            if current_word:
                words.append(current_word)
                current_word = []
            words.append(' ')
        elif is_hangul(char):
            current_word.append(char)
        else:
            if current_word:
                words.append(current_word)
                current_word = []
            words.append(char)

    if current_word:
        words.append(current_word)

    result_parts = []
    for word in words:
        if word == ' ':
            result_parts.append(' ')
        elif isinstance(word, list):
            syllables = decompose_text(word)
            syllables = apply_phonological_rules(syllables)
            phonetic = syllables_to_phonetic(syllables)
            result_parts.append(phonetic)
        else:
            result_parts.append(word)

    return ''.join(result_parts)
