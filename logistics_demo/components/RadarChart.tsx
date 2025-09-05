'use client'

import { useEffect, useRef } from 'react'
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto'
import { OptimizationData, MetricCards } from '../data/scheduleDataLoader'

interface RadarChartProps {
  data: OptimizationData
  metricCards: MetricCards
}

export default function RadarChart({ data, metricCards }: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const chartData: ChartData<'radar'> = {
          labels: [
            'Appointment\nVolume',
            // 'Provider\nBalance', 
            'Travel\nEfficiency',
            'Continuity\nof Care',
            'Workload\nBalance'
          ],
          datasets: [
            {
              label: 'Recommended',
              data: [
                data.recommended.appointmentVolume,
                // data.recommended.providerBalance,
                data.recommended.travelEfficiency,
                data.recommended.continuityOfCare,
                data.recommended.workloadBalance
              ],
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 0.8)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(59, 130, 246, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            },
            {
              label: 'Baseline',
              data: [
                data.baseline.appointmentVolume,
                // data.baseline.providerBalance,
                data.baseline.travelEfficiency,
                data.baseline.continuityOfCare,
                data.baseline.workloadBalance
              ],
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderColor: 'rgba(239, 68, 68, 0.8)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(239, 68, 68, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            }
          ]
        }

        const config: ChartConfiguration<'radar'> = {
          type: 'radar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  color: '#9ca3af',
                  backdropColor: 'transparent'
                },
                grid: {
                  color: 'rgba(59, 130, 246, 0.1)'
                },
                pointLabels: {
                  color: '#9ca3af',
                  font: {
                    size: 11
                  },
                  callback: function(value: any, index: number) {
                    const labels = [
                      'Appointment\nVolume',
                      // 'Provider\nBalance', 
                      'Travel\nEfficiency',
                      'Continuity\nof Care',
                      'Workload\nBalance'
                    ]
                    return labels[index] ? labels[index].split('\n') : [value]
                  }
                }
              }
            }
          }
        }

        chartInstance.current = new Chart(ctx, config)
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Radar Chart */}
      <div className="relative w-48 h-48 mb-6">
        <canvas ref={chartRef} />
      </div>
      
      {/* Metric Cards */}
      <div className="w-full grid grid-cols-2 gap-3">
        {/* Appointments Card */}
        <div className="bg-dark-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white mb-1">{metricCards.appointmentsScheduled.value}</div>
          <div className={`text-xs mb-1 ${metricCards.appointmentsScheduled.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {metricCards.appointmentsScheduled.change}
          </div>
          <div className="text-xs text-gray-300">{metricCards.appointmentsScheduled.label}</div>
        </div>
        
        {/* Travel Time Card */}
        <div className="bg-dark-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white mb-1">{metricCards.totalTravelTime.value}</div>
          <div className={`text-xs mb-1 ${metricCards.totalTravelTime.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {metricCards.totalTravelTime.change}
          </div>
          <div className="text-xs text-gray-300">{metricCards.totalTravelTime.label}</div>
        </div>

        {/* Workload Balance Card */}
        <div className="bg-dark-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white mb-1">{metricCards.workloadBalance.value}</div>
          <div className={`text-xs mb-1 ${metricCards.workloadBalance.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {metricCards.workloadBalance.change}
          </div>
          <div className="text-xs text-gray-300">{metricCards.workloadBalance.label}</div>
        </div>

        {/* Continuity of Care Card */}
        <div className="bg-dark-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white mb-1">{metricCards.continuityOfCare.value}</div>
          <div className={`text-xs mb-1 ${metricCards.continuityOfCare.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {metricCards.continuityOfCare.change}
          </div>
          <div className="text-xs text-gray-300">{metricCards.continuityOfCare.label}</div>
        </div>
      </div>
    </div>
  )
}
