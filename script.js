// タブ切り替え機能 (日常点検用)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // すべてのタブコンテンツを非表示
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // すべてのタブボタンからactiveクラスを削除
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 指定されたタブを表示し、ボタンをアクティブに
    document.getElementById(tabName).style.display = "block";
    if(evt) {
        evt.currentTarget.className += " active";
    }
}

// 完了処理 (各タスクページから呼び出し)
function completeTask(taskName) {
    // localStorageに完了状態を保存
    localStorage.setItem('status_' + taskName, 'completed');
    
    // 車両詳細ページに戻る
    window.location.href = 'index.html';
}

// index.html用の状態更新関数
function updateIndexStatus() {
    // 監視するタスクIDのリスト
    const tasks = ['daily', 'interior', 'wash', 'exterior', 'lend'];

    tasks.forEach(function(task) {
        var status = localStorage.getItem('status_' + task);
        
        if (status === 'completed') {
            // 1. 「未実施」バッジを消去
            var badge = document.getElementById('badge-' + task);
            if (badge) {
                badge.style.display = 'none';
            }

            // 2. ボタンのテキストを「完了」に変更 (色は黄色のまま)
            var btn = document.getElementById('btn-' + task);
            if (btn) {
                btn.innerHTML = '完了';
            }
        }
    });
}
