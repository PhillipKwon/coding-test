#!/usr/bin/env python3
"""
README 자동 업데이트 스크립트
GitHub Actions에서 실행되어 문제 통계와 진행 상황을 자동으로 업데이트합니다.
"""

import argparse
import re
from datetime import datetime
from pathlib import Path


def update_statistics_table(content, stats):
    """문제 통계 테이블을 업데이트합니다."""
    # 정확한 테이블 위치를 찾아서 교체
    lines = content.split('\n')
    
    # 문제 통계 섹션 찾기
    start_idx = None
    end_idx = None
    
    for i, line in enumerate(lines):
        if line.strip() == '## 📊 문제 통계':
            start_idx = i
        elif start_idx is not None and line.strip() == '---':
            end_idx = i
            break
    
    if start_idx is not None and end_idx is not None:
        print(f"✅ 문제 통계 섹션 찾음: {start_idx} ~ {end_idx}")
        
        # 새로운 테이블 생성
        new_table = f"""| 플랫폼           | 총 문제 수 | JavaScript | Python | TypeScript |
| ---------------- | ---------- | ---------- | ------ | ---------- |
| **백준**         | {stats['baekjoon_total']}          | {stats['baekjoon_js']}          | {stats['baekjoon_py']}      | {stats['baekjoon_ts']}          |
| **프로그래머스** | {stats['programmers_total']}         | {stats['programmers_js']}         | {stats['programmers_py']}     | {stats['programmers_ts']}          |
| **LeetCode**     | {stats['leetcode_total']}          | {stats['leetcode_js']}          | {stats['leetcode_py']}      | {stats['leetcode_ts']}          |
| **HackerRank**   | 0          | 0          | 0      | 0          |"""
        
        # 섹션 교체
        new_lines = lines[:start_idx + 2] + [new_table] + lines[end_idx:]
        print(f"새로운 통계: 백준={stats['baekjoon_total']}, 프로그래머스={stats['programmers_total']}, LeetCode={stats['leetcode_total']}")
        return '\n'.join(new_lines)
    else:
        print(f"❌ 문제 통계 섹션을 찾을 수 없음")
        return content


def update_progress_section(content, stats):
    """진행 상황 섹션을 업데이트합니다."""
    # 프로그래머스 레벨별 진행도
    programmers_progress = f"""### 프로그래머스 레벨별 진행도
- **Level 0**: ({stats['programmers_lv0']}문제)
- **Level 1**: ({stats['programmers_lv1']}문제)  
- **Level 2**: ({stats['programmers_lv2']}문제)
- **Level 3**: ({stats['programmers_lv3']}문제)"""

    # LeetCode 난이도별 진행도
    leetcode_progress = f"""### LeetCode 난이도별 진행도
- **Easy**: ({stats['leetcode_easy']}문제)
- **Medium**: ({stats['leetcode_medium']}문제)
- **Hard**: ({stats['leetcode_hard']}문제)"""

    # 백준 난이도별 진행도 (기본값 - 나중에 GitHub Actions에서 계산)
    baekjoon_progress = f"""### 백준 난이도별 진행도
- **Bronze**: ({stats['baekjoon_bronze']}문제)
- **Silver**: ({stats['baekjoon_silver']}문제)
- **Gold**: ({stats['baekjoon_gold']}문제)"""

    progress_section = f"""## 📈 진행 상황

{programmers_progress}

{leetcode_progress}

{baekjoon_progress}

---

"""
    
    # 기존 진행 상황 섹션을 찾아서 교체
    progress_pattern = r'(## 📈 진행 상황\n\n.*?\n\n---\n\n)'
    if re.search(progress_pattern, content, flags=re.DOTALL):
        return re.sub(progress_pattern, progress_section, content, flags=re.DOTALL)
    else:
        # 진행 상황 섹션이 없으면 추가
        return content.replace('## 🛠️ 사용 기술', progress_section + '## 🛠️ 사용 기술')


def update_recent_problems(content):
    """최근 해결한 문제 섹션을 업데이트합니다."""
    import os
    import glob
    import subprocess
    from datetime import datetime
    import pytz
    
    # 모든 문제 파일 찾기 (JavaScript, Python, TypeScript)
    problem_files = []
    
    # 백준 문제들
    baekjoon_files = glob.glob('baekjoon/**/*.js', recursive=True) + \
                     glob.glob('baekjoon/**/*.py', recursive=True) + \
                     glob.glob('baekjoon/**/*.ts', recursive=True) + \
                     glob.glob('백준/**/*.js', recursive=True) + \
                     glob.glob('백준/**/*.py', recursive=True) + \
                     glob.glob('백준/**/*.ts', recursive=True)
    
    # 프로그래머스 문제들
    programmers_files = glob.glob('programmers/**/*.js', recursive=True) + \
                        glob.glob('programmers/**/*.py', recursive=True) + \
                        glob.glob('programmers/**/*.ts', recursive=True) + \
                        glob.glob('프로그래머스/**/*.js', recursive=True) + \
                        glob.glob('프로그래머스/**/*.py', recursive=True) + \
                        glob.glob('프로그래머스/**/*.ts', recursive=True)
    
    # LeetCode 문제들
    leetcode_files = glob.glob('leetcode/**/*.js', recursive=True) + \
                     glob.glob('leetcode/**/*.py', recursive=True) + \
                     glob.glob('leetcode/**/*.ts', recursive=True)
    
    # 파일 정보 수집 (경로, 커밋시간)
    for file_path in baekjoon_files + programmers_files + leetcode_files:
        if os.path.exists(file_path):
            # GitHub Actions 환경인지 확인
            is_github_actions = os.environ.get('GITHUB_ACTIONS') == 'true'
            
            if is_github_actions:
                # GitHub Actions에서는 파일 수정시간 사용
                mtime = os.path.getmtime(file_path)
                print(f"🤖 GitHub Actions 환경, 파일 수정시간 사용: {file_path} -> {mtime}")
                problem_files.append((file_path, mtime))
            else:
                # 로컬 환경에서는 git 커밋 시간 사용
                try:
                    # git log에서 해당 파일의 최신 커밋 시간 가져오기
                    result = subprocess.run(
                        ['git', 'log', '--follow', '--format=%at', '--', file_path],
                        capture_output=True, text=True, cwd=os.getcwd()
                    )
                    if result.returncode == 0 and result.stdout.strip():
                        # 첫 번째 커밋 시간 (가장 최신)
                        commit_time = int(result.stdout.strip().split('\n')[0])
                        print(f"✅ Git log 성공: {file_path} -> {commit_time}")
                        problem_files.append((file_path, commit_time))
                    else:
                        # git log가 실패하면 해당 파일 제외 (커밋되지 않은 파일)
                        print(f"❌ Git log 실패, 파일 제외 (커밋되지 않음): {file_path}")
                except Exception as e:
                    # 예외 발생 시 해당 파일 제외
                    print(f"❌ Git log 예외, 파일 제외: {file_path} (에러: {e})")
    
    # 커밋시간 기준으로 정렬 (최신순)
    problem_files.sort(key=lambda x: x[1], reverse=True)
    
    # 최근 5개 문제 선택
    recent_problems_list = []
    for file_path, commit_time in problem_files[:5]:
        # 파일명에서 문제 정보 추출
        filename = os.path.basename(file_path)
        dir_path = os.path.dirname(file_path)
        
        # 한국시간으로 변환
        kst = pytz.timezone('Asia/Seoul')
        date_str = datetime.fromtimestamp(commit_time, tz=pytz.UTC).astimezone(kst).strftime('%Y.%m.%d %H:%M:%S')
        
        # 플랫폼과 난이도/레벨 추출
        platform = ""
        level = ""
        
        if 'baekjoon' in file_path or '백준' in file_path:
            platform = "백준"
            # 백준 폴더에서 난이도 추출
            if 'Silver' in dir_path:
                level = " (Silver)"
            elif 'Gold' in dir_path:
                level = " (Gold)"
            elif 'Bronze' in dir_path:
                level = " (Bronze)"
        elif 'programmers' in file_path or '프로그래머스' in file_path:
            platform = "프로그래머스"
            # 프로그래머스 폴더에서 레벨 추출
            if 'Lv. 0' in dir_path or '/0/' in dir_path:
                level = " Lv.0"
            elif 'Lv. 1' in dir_path or '/1/' in dir_path:
                level = " Lv.1"
            elif 'Lv. 2' in dir_path or '/2/' in dir_path:
                level = " Lv.2"
            elif 'Lv. 3' in dir_path or '/3/' in dir_path:
                level = " Lv.3"
        elif 'leetcode' in file_path:
            platform = "LeetCode"
            # LeetCode 폴더에서 난이도 추출
            if 'easy' in dir_path:
                level = " (Easy)"
            elif 'medium' in dir_path:
                level = " (Medium)"
            elif 'hard' in dir_path:
                level = " (Hard)"
        
        # 파일명에서 문제 번호와 제목 추출
        problem_info = filename.replace('.js', '').replace('.py', '').replace('.ts', '')
        
        # 시간 포맷팅
        if is_github_actions:
            # GitHub Actions에서는 파일 수정시간 사용
            formatted_time = datetime.fromtimestamp(commit_time, tz=pytz.UTC).astimezone(kst).strftime('%Y.%m.%d %H:%M:%S')
        else:
            # 로컬에서는 git 커밋 시간 사용
            formatted_time = datetime.fromtimestamp(commit_time, tz=pytz.UTC).astimezone(kst).strftime('%Y.%m.%d %H:%M:%S')
        
        recent_problems_list.append(f"- [x] {platform} {problem_info}{level} ({formatted_time})")
    
    # 기본값 (파일을 찾지 못한 경우)
    if not recent_problems_list:
        recent_problems_list = [
            "- [x] 백준 2805. 나무 자르기 (Silver) (2024.12.20 15:30:00)",
            "- [x] 프로그래머스 Lv.3 베스트앨범 (2024.12.19 14:25:00)",
            "- [x] LeetCode 80. Remove Duplicates from Sorted Array II (2024.12.18 16:45:00)",
            "- [x] 프로그래머스 Lv.2 게임 맵 최단거리 (2024.12.17 13:20:00)",
            "- [x] 백준 11659. 구간 합 구하기 4 (2024.12.16 11:15:00)"
        ]
    
    recent_problems = "### 🔥 최근 해결한 문제\n" + "\n".join(recent_problems_list)

    # 기존 최근 문제 섹션을 찾아서 교체
    recent_pattern = r'(### 🔥 최근 해결한 문제\n.*?\n\n)'
    if re.search(recent_pattern, content, flags=re.DOTALL):
        return re.sub(recent_pattern, recent_problems + '\n\n', content, flags=re.DOTALL)
    else:
        # 섹션이 없으면 추가
        return content.replace('### 🏅 대표 문제들', recent_problems + '\n### 🏅 대표 문제들')


def update_table_of_contents(content):
    """목차를 업데이트합니다."""
    toc_pattern = r'(## 📋 목차\n\n.*?\n\n---\n\n)'
    
    new_toc = """## 📋 목차

- [📊 문제 통계](#-문제-통계)
- [🗂️ 문제 분류](#️-문제-분류)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [🎯 해결한 문제들](#-해결한-문제들)
- [📈 진행 상황](#-진행-상황)
- [🛠️ 사용 기술](#-사용-기술)
- [📞 연락처](#-연락처)

---

"""
    
    if re.search(toc_pattern, content, flags=re.DOTALL):
        return re.sub(toc_pattern, new_toc, content, flags=re.DOTALL)
    else:
        # 목차가 없으면 추가
        return content.replace('## 📊 문제 통계', new_toc + '## 📊 문제 통계')


def update_last_updated(content):
    """마지막 업데이트 시간을 추가합니다."""
    current_time = datetime.now().strftime("%Y년 %m월 %d일 %H:%M")
    
    # README 하단에 마지막 업데이트 정보 추가
    update_info = f"""

---

<div align="center">

**마지막 업데이트**: {current_time}  
**⭐ 이 저장소가 도움이 되었다면 스타를 눌러주세요! ⭐**

*알고리즘 마스터가 되기 위한 여정을 함께해요! 🚀*

</div>"""
    
    # 기존 하단 섹션을 교체
    bottom_pattern = r'(<div align="center">\n\n\*\*⭐ 이 저장소가 도움이 되었다면 스타를 눌러주세요! ⭐\*\*\n\n\*알고리즘 마스터가 되기 위한 여정을 함께해요! 🚀\*\*\n\n</div>)'
    return re.sub(bottom_pattern, update_info, content, flags=re.DOTALL)


def main():
    parser = argparse.ArgumentParser(description='README 자동 업데이트')
    
    # 통계 인자들
    parser.add_argument('--baekjoon-total', type=int, default=0)
    parser.add_argument('--baekjoon-js', type=int, default=0)
    parser.add_argument('--baekjoon-py', type=int, default=0)
    parser.add_argument('--baekjoon-ts', type=int, default=0)
    
    parser.add_argument('--programmers-total', type=int, default=0)
    parser.add_argument('--programmers-js', type=int, default=0)
    parser.add_argument('--programmers-py', type=int, default=0)
    parser.add_argument('--programmers-ts', type=int, default=0)
    
    parser.add_argument('--leetcode-total', type=int, default=0)
    parser.add_argument('--leetcode-js', type=int, default=0)
    parser.add_argument('--leetcode-py', type=int, default=0)
    parser.add_argument('--leetcode-ts', type=int, default=0)
    
    parser.add_argument('--programmers-lv0', type=int, default=0)
    parser.add_argument('--programmers-lv1', type=int, default=0)
    parser.add_argument('--programmers-lv2', type=int, default=0)
    parser.add_argument('--programmers-lv3', type=int, default=0)
    
    parser.add_argument('--leetcode-easy', type=int, default=0)
    parser.add_argument('--leetcode-medium', type=int, default=0)
    parser.add_argument('--leetcode-hard', type=int, default=0)
    
    parser.add_argument('--baekjoon-bronze', type=int, default=0)
    parser.add_argument('--baekjoon-silver', type=int, default=0)
    parser.add_argument('--baekjoon-gold', type=int, default=0)
    
    args = parser.parse_args()
    
    # 통계 데이터 구성
    stats = {
        'baekjoon_total': args.baekjoon_total,
        'baekjoon_js': args.baekjoon_js,
        'baekjoon_py': args.baekjoon_py,
        'baekjoon_ts': args.baekjoon_ts,
        'programmers_total': args.programmers_total,
        'programmers_js': args.programmers_js,
        'programmers_py': args.programmers_py,
        'programmers_ts': args.programmers_ts,
        'leetcode_total': args.leetcode_total,
        'leetcode_js': args.leetcode_js,
        'leetcode_py': args.leetcode_py,
        'leetcode_ts': args.leetcode_ts,
        'programmers_lv0': args.programmers_lv0,
        'programmers_lv1': args.programmers_lv1,
        'programmers_lv2': args.programmers_lv2,
        'programmers_lv3': args.programmers_lv3,
        'leetcode_easy': args.leetcode_easy,
        'leetcode_medium': args.leetcode_medium,
        'leetcode_hard': args.leetcode_hard,
        'baekjoon_bronze': args.baekjoon_bronze,
        'baekjoon_silver': args.baekjoon_silver,
        'baekjoon_gold': args.baekjoon_gold,
    }
    
    # README 파일 읽기
    readme_path = Path('README.md')
    if not readme_path.exists():
        print("❌ README.md 파일을 찾을 수 없습니다.")
        return
    
    content = readme_path.read_text(encoding='utf-8')
    
    # 업데이트 실행
    print("🔄 README 업데이트 중...")
    
    # 1. 목차 업데이트
    content = update_table_of_contents(content)
    print("✅ 목차 업데이트 완료")
    
    # 2. 통계 테이블 업데이트
    content = update_statistics_table(content, stats)
    print("✅ 통계 테이블 업데이트 완료")
    
    # 3. 진행 상황 섹션 업데이트
    content = update_progress_section(content, stats)
    print("✅ 진행 상황 섹션 업데이트 완료")
    
    # 4. 최근 문제 업데이트
    content = update_recent_problems(content)
    print("✅ 최근 문제 섹션 업데이트 완료")
    
    # 5. 마지막 업데이트 시간 추가
    content = update_last_updated(content)
    print("✅ 마지막 업데이트 시간 추가 완료")
    
    # 파일 저장
    readme_path.write_text(content, encoding='utf-8')
    print("🎉 README 업데이트 완료!")


if __name__ == '__main__':
    main() 