
document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume portfolio loaded successfully');
    
    initThemeSystem();
    
    addSkillIcons();
});


function initThemeSystem() {
    const themes = ['default', 'theme-modern', 'theme-professional', 'theme-creative'];
    let currentThemeIndex = 0;
    
    const colorButton = document.getElementById('colorButton');
    
    if (!colorButton) return;
    
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
        applyTheme(savedTheme);
    }
    
    colorButton.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        applyTheme(newTheme);
        
        localStorage.setItem('resumeTheme', newTheme);
    });
}

function applyTheme(theme) {
    const body = document.body;
    
    body.classList.remove('theme-modern', 'theme-professional', 'theme-creative');
    
    if (theme !== 'default') {
        body.classList.add(theme);
    }
}

function addSkillIcons() {
    const iconMap = {
        // Testing Types
        'Database Testing': { class: 'fa-database', type: 'fas' },
        'API Testing': { class: 'fa-plug', type: 'fas' },
        'Functional Testing': { class: 'fa-check-circle', type: 'fas' },
        'E2E Testing': { class: 'fa-sitemap', type: 'fas' },
        'End to End Testing': { class: 'fa-sitemap', type: 'fas' },
        'Regression Testing': { class: 'fa-redo', type: 'fas' },
        'Positive and Negative Testing': { class: 'fa-check', type: 'fas' },
        'Positive': { class: 'fa-check', type: 'fas' },
        'Negative': { class: 'fa-times', type: 'fas' },
        'Smoke Testing': { class: 'fa-smoking', type: 'fas' },
        'UI Testing': { class: 'fa-desktop', type: 'fas' },
        'Mobile Testing': { class: 'fa-mobile-alt', type: 'fas' },
        'Performance Testing': { class: 'fa-tachometer-alt', type: 'fas' },
        'Load Testing': { class: 'fa-server', type: 'fas' },
        'Log Monitoring': { class: 'fa-file-alt', type: 'fas' },
        'gRPC Testing': { class: 'fa-network-wired', type: 'fas' },
        
        // Testing Tools
        'Selenium WebDriver': { class: 'fa-spider', type: 'fas' },
        'Selenium': { class: 'fa-spider', type: 'fas' },
        'Cucumber': { class: 'fa-seedling', type: 'fas' },
        'Postman': { class: 'fa-paper-plane', type: 'fas' },
        'SQL Developer': { class: 'fa-database', type: 'fas' },
        'Jenkins': { class: 'fa-cog', type: 'fas' },
        'Appium': { class: 'fa-mobile-alt', type: 'fas' },
        'JMeter': { class: 'fa-chart-line', type: 'fas' },
        'Cypress': { class: 'fa-shield-alt', type: 'fas' },
        'Playwright': { class: 'fa-theater-masks', type: 'fas' },
        'GitHub Actions': { class: 'fa-github', type: 'fab' },
        'DataDog': { class: 'fa-chart-area', type: 'fas' },
        'Datadog': { class: 'fa-chart-area', type: 'fas' },
        'K6 Grafana': { class: 'fa-chart-bar', type: 'fas' },
        'Grafana': { class: 'fa-chart-bar', type: 'fas' },
        'GHZ': { class: 'fa-bolt', type: 'fas' },
        'K6': { class: 'fa-chart-bar', type: 'fas' },
        
        // Frameworks
        'BDD Cucumber': { class: 'fa-seedling', type: 'fas' },
        'BDD': { class: 'fa-seedling', type: 'fas' },
        'Serenity': { class: 'fa-leaf', type: 'fas' },
        'POM': { class: 'fa-layer-group', type: 'fas' },
        'Page Object Model': { class: 'fa-layer-group', type: 'fas' },
        'JUnit': { class: 'fa-flask', type: 'fas' },
        'Junit': { class: 'fa-flask', type: 'fas' },
        'TestNG': { class: 'fa-vial', type: 'fas' },
        'JDBC': { class: 'fa-plug', type: 'fas' },
        'Mocha': { class: 'fa-coffee', type: 'fas' },
        'REST Assured': { class: 'fa-shield-alt', type: 'fas' },
        'REST Assured Library': { class: 'fa-shield-alt', type: 'fas' },
        
        // Languages
        'JAVA': { class: 'fa-coffee', type: 'fas' },
        'Java': { class: 'fa-coffee', type: 'fas' },
        'SQL': { class: 'fa-database', type: 'fas' },
        'HTML': { class: 'fa-html5', type: 'fab' },
        'Gherkin': { class: 'fa-code', type: 'fas' },
        'JavaScript': { class: 'fa-js', type: 'fab' },
        'JS': { class: 'fa-js', type: 'fab' },
        'Shell Scripting': { class: 'fa-terminal', type: 'fas' },
        'Python': { class: 'fa-python', type: 'fab' },
        'GO (Golang)': { class: 'fa-code', type: 'fas' },
        'Golang': { class: 'fa-code', type: 'fas' },
        'GO': { class: 'fa-code', type: 'fas' },
        'TypeScript': { class: 'fa-code', type: 'fas' },
        'GORM': { class: 'fa-database', type: 'fas' },
        'Gin': { class: 'fa-code', type: 'fas' },
        
        // Platforms
        'Windows': { class: 'fa-windows', type: 'fab' },
        'MacOS': { class: 'fa-apple', type: 'fab' },
        'macOS': { class: 'fa-apple', type: 'fab' },
        'Linux': { class: 'fa-linux', type: 'fab' },
        'Android': { class: 'fa-android', type: 'fab' },
        'IOS': { class: 'fa-apple', type: 'fab' },
        'iOS': { class: 'fa-apple', type: 'fab' },
        
        // IDE
        'IntelliJ': { class: 'fa-code', type: 'fas' },
        'VS Code': { class: 'fa-code', type: 'fas' },
        'DBeaver': { class: 'fa-database', type: 'fas' },
        
        // Databases
        'Oracle DB': { class: 'fa-database', type: 'fas' },
        'Oracle': { class: 'fa-database', type: 'fas' },
        'MySQL': { class: 'fa-database', type: 'fas' },
        'Postgre DB': { class: 'fa-database', type: 'fas' },
        'PostgreSQL': { class: 'fa-database', type: 'fas' },
        'Elastic Search': { class: 'fa-search', type: 'fas' },
        'ElasticSearch': { class: 'fa-search', type: 'fas' },
        'MongoDB': { class: 'fa-database', type: 'fas' },
        'DynamoDB': { class: 'fa-database', type: 'fas' },
        'SnowFlake': { class: 'fa-snowflake', type: 'fas' },
        'Snowflake': { class: 'fa-snowflake', type: 'fas' },
        
        // Build Tools
        'MAVEN': { class: 'fa-box', type: 'fas' },
        'Maven': { class: 'fa-box', type: 'fas' },
        'Node.js': { class: 'fa-code-branch', type: 'fas' },
        'Node': { class: 'fa-code-branch', type: 'fas' },
        'NPM': { class: 'fa-archive', type: 'fas' },
        'Yarn': { class: 'fa-archive', type: 'fas' },
        
        // Repository System
        'Git': { class: 'fa-git-alt', type: 'fab' },
        'GitHub': { class: 'fa-github', type: 'fab' },
        'GitLab': { class: 'fa-gitlab', type: 'fab' },
        'Bitbucket': { class: 'fa-bitbucket', type: 'fab' },
        
        // Methodologies
        'Agile': { class: 'fa-tasks', type: 'fas' },
        'Scrum': { class: 'fa-users', type: 'fas' },
        'Waterfall': { class: 'fa-stream', type: 'fas' },
        
        // Project Management
        'JIRA': { class: 'fa-tasks', type: 'fas' },
        'Jira': { class: 'fa-tasks', type: 'fas' },
        'JIRA Xray': { class: 'fa-bug', type: 'fas' },
        
        // Environment & Concepts
        'Docker': { class: 'fa-docker', type: 'fab' },
        'Containerization': { class: 'fa-docker', type: 'fab' },
        'Kubernetes': { class: 'fa-cubes', type: 'fas' },
        'OpenShift': { class: 'fa-cubes', type: 'fas' },
        'Cloud Computing': { class: 'fa-cloud', type: 'fas' },
        'Cloud': { class: 'fa-cloud', type: 'fas' },
        'CI/CD': { class: 'fa-sync-alt', type: 'fas' },
        'Continuous Integration': { class: 'fa-sync-alt', type: 'fas' },
        'DevOps': { class: 'fa-tools', type: 'fas' },
        'OOP Concepts': { class: 'fa-cube', type: 'fas' },
        'OOP': { class: 'fa-cube', type: 'fas' },
        'JAVA OOP': { class: 'fa-cube', type: 'fas' },
        'JAVA OOP Concepts': { class: 'fa-cube', type: 'fas' },
        'Concepts': { class: 'fa-lightbulb', type: 'fas' },
        'Design Pattern': { class: 'fa-cube', type: 'fas' },
        'Pattern': { class: 'fa-cube', type: 'fas' },
        'Singleton': { class: 'fa-cube', type: 'fas' },
        'SDLC': { class: 'fa-sync-alt', type: 'fas' },
        'Software Development Life Cycle': { class: 'fa-sync-alt', type: 'fas' },
        'STLC': { class: 'fa-clipboard-check', type: 'fas' },
        'Software Test Life Cycle': { class: 'fa-clipboard-check', type: 'fas' },
        'DLC': { class: 'fa-redo', type: 'fas' },
        'Defect Life Cycle': { class: 'fa-redo', type: 'fas' },
        'Shell Scripting': { class: 'fa-terminal', type: 'fas' },
        'Linux': { class: 'fa-linux', type: 'fab' },
        'AWS': { class: 'fa-aws', type: 'fab' },
        'RabbitMQ': { class: 'fa-exchange-alt', type: 'fas' },
        'Rabbit MQ': { class: 'fa-exchange-alt', type: 'fas' },
        'API Gateway': { class: 'fa-network-wired', type: 'fas' },
        'Gateway': { class: 'fa-network-wired', type: 'fas' },
        'Microservices': { class: 'fa-sitemap', type: 'fas' },
        'JWT': { class: 'fa-key', type: 'fas' },
        'JWT Auth': { class: 'fa-key', type: 'fas' },
        
        // Other/Engineering
        'Software Development': { class: 'fa-code', type: 'fas' },
        'System Development': { class: 'fa-server', type: 'fas' },
        'System Testing': { class: 'fa-vial', type: 'fas' },
        'SEO': { class: 'fa-search', type: 'fas' },
        'Social Media Marketing': { class: 'fa-share-alt', type: 'fas' },
        'Marketing': { class: 'fa-bullhorn', type: 'fas' },
        'Neuro Marketing': { class: 'fa-brain', type: 'fas' },
        'ISO': { class: 'fa-certificate', type: 'fas' },
        'Certification': { class: 'fa-certificate', type: 'fas' },
        'ISO/EN Certification': { class: 'fa-certificate', type: 'fas' },
        'ERP': { class: 'fa-building', type: 'fas' },
        'Enterprise Resource Management': { class: 'fa-building', type: 'fas' },
        'CAD': { class: 'fa-ruler', type: 'fas' },
        'CAM': { class: 'fa-cogs', type: 'fas' },
        'CAD/CAM': { class: 'fa-ruler', type: 'fas' },
        'Product Design': { class: 'fa-pencil-alt', type: 'fas' },
        'Design': { class: 'fa-pencil-alt', type: 'fas' },
        'Risk Management': { class: 'fa-exclamation-triangle', type: 'fas' },
        'Operational Research': { class: 'fa-chart-line', type: 'fas' },
        'Planning': { class: 'fa-calendar', type: 'fas' },
        'Operational Research and Planning': { class: 'fa-calendar', type: 'fas' }
    };
    
    const skillItems = document.querySelectorAll('.skill-category li');
    const defaultIcon = { class: 'fa-star', type: 'fas' };
    
    skillItems.forEach(item => {
        // Check if icon already exists
        if (item.querySelector('i')) {
            return;
        }
        
        const skillText = item.textContent.trim();
        let iconFound = false;
        
        // Try exact match first, then partial matches
        // Sort by length (longest first) to match more specific terms first
        const sortedEntries = Object.entries(iconMap).sort((a, b) => b[0].length - a[0].length);
        
        for (const [skill, iconData] of sortedEntries) {
            const skillLower = skill.toLowerCase().trim();
            const textLower = skillText.toLowerCase().trim();
            
            // Exact match (highest priority)
            if (textLower === skillLower) {
                addIconToItem(item, iconData);
                iconFound = true;
                break;
            }
            
            // Word boundary match - skill appears as whole word
            const wordBoundaryRegex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (wordBoundaryRegex.test(textLower)) {
                addIconToItem(item, iconData);
                iconFound = true;
                break;
            }
            
            // Contains match (fallback)
            if (textLower.includes(skillLower) && skillLower.length >= 3) {
                addIconToItem(item, iconData);
                iconFound = true;
                break;
            }
        }
        
        // If no icon found, use default fallback
        if (!iconFound) {
            addIconToItem(item, defaultIcon);
        }
    });
}

function addIconToItem(item, iconData) {
    const icon = document.createElement('i');
    // Use correct icon type (fab for brands, fas for solid)
    icon.className = `${iconData.type} ${iconData.class}`;
    icon.setAttribute('aria-hidden', 'true');
    
    // Remove existing icon if any
    const existingIcon = item.querySelector('i');
    if (existingIcon) {
        existingIcon.remove();
    }
    
    // Insert icon at the beginning
    item.insertBefore(icon, item.firstChild);
}
