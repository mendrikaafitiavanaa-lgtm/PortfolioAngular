import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnChanges {
  @Input() darkMode = false;
  @Input() counts!: { 
    utilisateurs: number; 
    voitures: number; 
    categories: number; 
    clients: number; 
    factures: number 
  };

  chartData: ChartConfiguration['data'] = {
    labels: ['Utilisateurs', 'Voitures', 'Catégories', 'Clients', 'Factures'],
    datasets: [
      {
        label: 'Statistiques',
        data: [0, 0, 0, 0, 0],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3
      }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {};

  ngOnChanges(): void {
    if (this.counts) {
      this.chartData.datasets[0].data = [
        this.counts.utilisateurs,
        this.counts.voitures,
        this.counts.categories,
        this.counts.clients,
        this.counts.factures
      ];
    }

    // ⚡ Mettre à jour dynamiquement les couleurs
    const textColor = this.darkMode ? '#fff' : '#000';
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: textColor }
        },
        title: {
          display: true,
          text: '📊 Statistiques globales',
          color: textColor
        }
      },
      scales: {
        x: {
          ticks: { color: textColor },
          title: { display: true, text: 'Éléments', color: textColor }
        },
        y: {
          ticks: { color: textColor },
          title: { display: true, text: 'Valeurs', color: textColor }
        }
      }
    };
  }
}
