
// public/js/chart.js 开花预测仪表盘（Chart.js集成）
class BloomGauge {
    constructor(canvasId) {
      this.ctx = document.getElementById(canvasId).getContext('2d');
      this.chart = null;
    }
  
    render(forecastData) {
      if (this.chart) this.chart.destroy();
      
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: forecastData.dates,
          datasets: [{
            label: '开花率预测',
            data: forecastData.rates,
            borderColor: '#ff69b4',
            tension: 0.4,
            fill: false
          }]
        },
        options: {
          responsive: true,
          plugins: {
            annotation: {
              annotations: {
                peakLine: {
                  type: 'line',
                  yMin: 100,
                  yMax: 100,
                  borderColor: '#ff1493',
                  borderWidth: 2,
                  label: {
                    content: '最佳观赏期',
                    position: 'end'
                  }
                }
              }
            }
          }
        }
      });
    }
  }

  // public/js/chart.js 前端调用预测API
const bloomGauge = new BloomGauge('forecastChart');
fetch('/api/forecast?lat=35.6895&lng=139.6917')
  .then(res => res.json())
  .then(data => bloomGauge.render(data));