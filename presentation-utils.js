/**
 * Additional utilities for the Financial Institution Earnings Presentation
 * Enhances the RevealJS presentation with custom functionality
 */

// Initialize presentation utilities after RevealJS loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Add custom keyboard shortcuts
    function addCustomKeyBindings() {
        // 'P' key for presentation mode (hide email footer)
        Reveal.addKeyBinding({keyCode: 80, key: 'P', description: 'Toggle presentation mode'}, function() {
            const footer = document.querySelector('.email-footer');
            if (footer) {
                footer.style.display = footer.style.display === 'none' ? 'block' : 'none';
            }
        });
        
        // 'H' key for help
        Reveal.addKeyBinding({keyCode: 72, key: 'H', description: 'Show help'}, function() {
            showHelpModal();
        });
        
        // 'T' key for timer
        Reveal.addKeyBinding({keyCode: 84, key: 'T', description: 'Toggle timer'}, function() {
            toggleTimer();
        });
    }
    
    // Show help modal with keyboard shortcuts
    function showHelpModal() {
        const helpContent = `
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; margin: 50px auto; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <h3 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Presentation Controls</h3>
                <div style="text-align: left; line-height: 1.8;">
                    <p><strong>Navigation:</strong></p>
                    <ul>
                        <li>Arrow Keys - Navigate slides</li>
                        <li>Space - Next slide</li>
                        <li>ESC - Slide overview</li>
                    </ul>
                    <p><strong>Features:</strong></p>
                    <ul>
                        <li>S - Speaker notes</li>
                        <li>F - Fullscreen</li>
                        <li>P - Toggle presentation mode</li>
                        <li>T - Toggle timer</li>
                        <li>H - This help</li>
                    </ul>
                    <p style="text-align: center; margin-top: 20px;">
                        <button onclick="closeHelpModal()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
                    </p>
                </div>
            </div>
        `;
        
        const overlay = document.createElement('div');
        overlay.id = 'help-modal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        overlay.innerHTML = helpContent;
        document.body.appendChild(overlay);
        
        // Close on click outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeHelpModal();
            }
        });
    }
    
    // Close help modal
    window.closeHelpModal = function() {
        const modal = document.getElementById('help-modal');
        if (modal) {
            modal.remove();
        }
    };
    
    // Timer functionality
    let timerInterval;
    let timerStartTime;
    let timerElement;
    
    function toggleTimer() {
        if (!timerElement) {
            createTimerElement();
        }
        
        if (timerInterval) {
            // Stop timer
            clearInterval(timerInterval);
            timerInterval = null;
            timerElement.style.background = '#dc3545';
            timerElement.innerHTML = '⏸️ Timer Paused';
        } else {
            // Start timer
            timerStartTime = Date.now();
            timerInterval = setInterval(updateTimer, 1000);
            timerElement.style.background = '#28a745';
        }
    }
    
    function createTimerElement() {
        timerElement = document.createElement('div');
        timerElement.style.cssText = `
            position: fixed;
            top: 15px;
            left: 25px;
            background: #28a745;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        timerElement.innerHTML = '⏱️ 00:00';
        document.body.appendChild(timerElement);
    }
    
    function updateTimer() {
        if (!timerStartTime) return;
        
        const elapsed = Math.floor((Date.now() - timerStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        timerElement.innerHTML = `⏱️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Add slide progress indicator
    function addSlideProgress() {
        const progressElement = document.createElement('div');
        progressElement.id = 'slide-progress';
        progressElement.style.cssText = `
            position: fixed;
            bottom: 15px;
            left: 25px;
            background: rgba(255,255,255,0.95);
            color: #2c3e50;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(progressElement);
        
        // Update progress on slide change
        Reveal.on('slidechanged', function(event) {
            const currentSlide = Reveal.getIndices().h + 1;
            const totalSlides = Reveal.getTotalSlides();
            progressElement.innerHTML = `📊 Slide ${currentSlide} of ${totalSlides}`;
        });
        
        // Initial update
        const currentSlide = Reveal.getIndices().h + 1;
        const totalSlides = Reveal.getTotalSlides();
        progressElement.innerHTML = `📊 Slide ${currentSlide} of ${totalSlides}`;
    }
    
    // Add smooth transitions for metric cards
    function enhanceMetricCards() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Initialize all utilities
    function initializePresentationUtils() {
        addCustomKeyBindings();
        addSlideProgress();
        enhanceMetricCards();
        
        // Add welcome message
        console.log('🏦 Financial Institution Earnings Presentation Loaded');
        console.log('📧 Contact: 22f3002631@ds.study.iitm.ac.in');
        console.log('⌨️  Press H for help with keyboard shortcuts');
    }
    
    // Wait for RevealJS to initialize
    if (typeof Reveal !== 'undefined') {
        Reveal.on('ready', initializePresentationUtils);
    } else {
        // Fallback if Reveal is not loaded yet
        setTimeout(initializePresentationUtils, 1000);
    }
});

// Utility functions for financial calculations (for demonstration)
const FinancialUtils = {
    // Calculate Value at Risk
    calculateVaR: function(returns, confidenceLevel = 0.99) {
        const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
        const stdDev = Math.sqrt(variance);
        const zScore = this.getZScore(confidenceLevel);
        return mean + zScore * stdDev;
    },
    
    // Get Z-score for confidence level
    getZScore: function(confidenceLevel) {
        const zScores = {
            0.90: -1.28,
            0.95: -1.65,
            0.99: -2.33
        };
        return zScores[confidenceLevel] || -2.33;
    },
    
    // Calculate Return on Equity
    calculateROE: function(netIncome, shareholdersEquity) {
        return (netIncome / shareholdersEquity) * 100;
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinancialUtils;
}
