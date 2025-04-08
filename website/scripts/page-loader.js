const paginationOrder = ['frontend-web-dev',
    'backend-web-dev',
    'pwas',
    'http-vs-https',
    'dns',
    'ftp-vs-sftp',
    'encryption-keys',
    'hash-values',
    'digital-signatures',
    'ssl-certs',
    'tls',
    'tcp-ip',
    'smtp-pop3-imap',
    'data-packets',
    'data-mining',
    'metadata',
    'ssm',
    'orm-vs-sql'
];

const nameMapping = {
    'frontend-web-dev': 'Frontend Web Development',
    'backend-web-dev': 'Backend Web Development',
    'pwas': 'PWAs',
    'http-vs-https': 'HTTP vs HTTPS',
    'dns': 'DNS',
    'ftp-vs-sftp': 'FTP vs SFTP',
    'encryption-keys': 'Encryption Keys',
    'hash-values': 'Hash Values',
    'digital-signatures': 'Digital Signatures',
    'ssl-certs': 'SSL Certificates',
    'tls': 'TLS',
    'tcp-ip': 'TCP/IP',
    'smtp-pop3-imap': 'SMTP, POP3, and IMAP',
    'data-packets': 'Data Packets',
    'data-mining': 'Data Mining',
    'metadata': 'Metadata',
    'ssm': 'SSM',
    'orm-vs-sql': 'ORM vs SQL'
};

function pagination(contentKey) {
    setTimeout(() => {
        const index = paginationOrder.indexOf(contentKey);

        var back = paginationOrder[index - 1];
        var forward = paginationOrder[index + 1];
        let forwardBtn = document.querySelector('.pg-btn.forward-page');
        let backBtn = document.querySelector('.pg-btn.back-page');
        if (forward !== undefined) {
            forwardBtn.style.opacity = '1';
            forwardBtn.children[0].children[1].innerHTML = nameMapping[forward];
        } else {
            forwardBtn.style.opacity = '0';
        }

        if (back !== undefined) {
            backBtn.style.opacity = '1';
            backBtn.children[1].children[1].innerHTML = nameMapping[back];
        } else {
            backBtn.style.opacity = '0';
        }

        forwardBtn.addEventListener('click', () => {
            if (forward !== undefined) {
                loadContent(forward);
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('highlighted');
                });
                document.querySelectorAll('.menu a').forEach(link => {
                    if (link.getAttribute('data-content') === forward) {
                        // Highlight the selected menu link
                        link.classList.add('highlighted');
                    }
                });
            }
        });

        backBtn.addEventListener('click', () => {
            if (back !== undefined) {
                loadContent(back);
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('highlighted');
                });
                document.querySelectorAll('.menu a').forEach(link => {
                    if (link.getAttribute('data-content') === back) {
                        // Highlight the selected menu link
                        link.classList.add('highlighted');
                    }
                });
            }
        });
    }, 100);
    
}

function loadContent(contentKey) {
    if (contentKey === 'nothing') {
        return;
    }

    

    // Update the URL hash
    window.location.hash = contentKey;

    // Fetch the corresponding markdown file
    fetch(`content/${contentKey}.md`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Markdown file not found');
            }
            return response.text();
        })
        .then(markdown => {
            // Convert markdown to HTML using marked
            const html = marked.parse(markdown);

            // Sanitize the HTML using DOMPurify
            const sanitizedHTML = DOMPurify.sanitize(html);

            // Update the main content
            document.querySelector('.main-content').innerHTML = sanitizedHTML;

            // Apply syntax highlighting
            document.querySelectorAll('pre code').forEach(block => {
                Prism.highlightElement(block);

                // Wrap code block inside a top bar container
                let pre = block.parentElement;
                if (pre) {
                    let container = document.createElement("div");
                    container.className = "code-box";

                    // Create top bar
                    let topBar = document.createElement("div");
                    topBar.className = "code-topbar";
                    topBar.innerHTML = `
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                        <div class="tab"></div>
                    `;

                    // Wrap everything properly
                    container.appendChild(topBar);
                    container.appendChild(pre.cloneNode(true));
                    pre.replaceWith(container);
                }
            });

            Prism.highlightAll();

            // Array of language names and icon names
            const languages = [
                { name: 'javascript', icon: 'javascript' },
                { name: 'python', icon: 'python' },
                { name: 'php', icon: 'PHP' },
                { name: 'css', icon: 'CSS3' },
                { name: 'html', icon: 'HTML5' },
                { name: 'java', icon: 'java' },
                { name: 'c', icon: 'c' },
                { name: 'cpp', icon: 'cplusplus' },
                { name: 'csharp', icon: 'csharp' },
                { name: 'ruby', icon: 'ruby' },
                { name: 'go', icon: 'go' },
                { name: 'swift', icon: 'swift' },
                { name: 'kotlin', icon: 'kotlin' },
                { name: 'typescript', icon: 'typescript' },
                { name: 'bash', icon: 'terminal' },
                { name: 'shell', icon: 'terminal' },
                { name: 'powershell', icon: 'terminal' },
                { name: 'sql', icon: 'database' },
                { name: 'json', icon: 'JSON' },
                { name: 'xml', icon: 'code' },
                { name: 'perl', icon: 'perl' },
                { name: 'r', icon: 'r' },
                { name: 'dart', icon: 'dart' },
                { name: 'scala', icon: 'scala' },
                { name: 'rust', icon: 'rust' },
                { name: 'lua', icon: 'lua' },
                { name: 'matlab', icon: 'matlab' },
                { name: 'haskell', icon: 'haskell' },
                { name: 'assembly', icon: 'chip' },
                { name: 'apache', icon: 'apache' },
                { name: 'plaintext', icon: 'plaintext' }
                // Add more languages here as needed
            ];

            // Loop through the languages array
            languages.forEach(language => {
                // Get the element with the corresponding class
                let languageElements = document.getElementsByClassName(`language-${language.name}`);
                
                if (language.icon === 'terminal') {
                    Array.from(languageElements).forEach(languageElement => {
                        if (languageElement && languageElement.parentElement && languageElement.parentElement.children[0] && languageElement.parentElement.children[0].children[3]) {
                            // Update the innerHTML with the icon and the capitalized language name
                            
                            languageElement.parentElement.children[0].children[3].innerHTML = `<i class='bx bx-${language.icon.toLowerCase()}'></i>&nbsp;${language.name.charAt(0).toUpperCase() + language.name.slice(1)}`;
                        }
                    });
                } else {
                    Array.from(languageElements).forEach(languageElement => {
                        if (languageElement && languageElement.parentElement && languageElement.parentElement.children[0] && languageElement.parentElement.children[0].children[3]) {
                            // Update the innerHTML with the icon and the capitalized language name
                            let elem = languageElement.parentElement.children[0].children[3];
                            if (elem.tagName === 'DIV') {
                                elem.innerHTML = `<i class='bx bxl-${language.icon.toLowerCase()}'></i>&nbsp;${language.icon.charAt(0).toUpperCase() + language.icon.slice(1)}`;
                            }
                        }
                    });
                }
            });


            const links = document.querySelectorAll('.main-content a');
            links.forEach(function(link) {
                link.setAttribute('target', '_blank');
            });

            document.documentElement.scrollTop = 0;
        })
        .catch(error => {
            console.error('Error loading markdown file:', error);
            document.querySelector('.main-content').innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });

    // Close the sidebar on small screens
    overlay.style.display = 'none';
    nav.style.animation = 'swing-out 0.2s ease-in forwards';
    setTimeout(() => {
        nav.classList.remove('active-sidebar');
    }, 200);

    pagination(contentKey);

}

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        // Remove highlight from all menu links
        document.querySelectorAll('.menu a').forEach(link => {
            link.classList.remove('highlighted');
        });

        // Highlight the selected menu link
        this.classList.add('highlighted');

        const contentKey = this.getAttribute('data-content');
        loadContent(contentKey);
    });
});

document.querySelectorAll('div.logo').forEach(logo => {
    logo.addEventListener('click', () => {
        loadContent('homepage');
    });
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const contentKey = hash ? hash : 'homepage';
    loadContent(contentKey);
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.getAttribute('data-content') === contentKey) {
            // Highlight the selected menu link
            link.classList.add('highlighted');
        }
    });
});