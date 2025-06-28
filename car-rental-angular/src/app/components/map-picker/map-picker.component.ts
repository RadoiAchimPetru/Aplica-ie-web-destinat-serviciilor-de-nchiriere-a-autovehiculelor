import {
  Component, AfterViewInit, OnDestroy,
  EventEmitter, Output, Input,
  ViewChild, ElementRef
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.scss']
})
export class MapPickerComponent implements AfterViewInit, OnDestroy {

  @Input()  locked = false;
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

 
  @ViewChild('map', { static: true }) mapEl!: ElementRef<HTMLElement>;

  private map!: L.Map;
  private resizeObs!: ResizeObserver;
  private orientationHandler = () =>
      setTimeout(() => this.map.invalidateSize(), 300);

  
  ngAfterViewInit(): void {
    this.initLeaflet();                    

    
    queueMicrotask(() => this.map.invalidateSize());

    
    this.resizeObs = new ResizeObserver(() =>
        this.map.invalidateSize());
    this.resizeObs.observe(this.mapEl.nativeElement);

    window.addEventListener('orientationchange', this.orientationHandler);
  }

  ngOnDestroy(): void {
    this.resizeObs?.disconnect();
    window.removeEventListener('orientationchange', this.orientationHandler);
  }

  
  private initLeaflet(): void {
  // 1. iniţializezi harta pe Timișoara, zoom 13
  this.map = L.map(this.mapEl.nativeElement).setView([45.7489, 21.2087], 13);

  // 2. tile layer OSM
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(this.map);


  this.map.on('zoomend', () => {
    setTimeout(() => this.map.invalidateSize(), 0);
  });

    let marker: L.Marker | null = null;

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.locked) { return; }

      const { lat, lng } = e.latlng;
      marker?.remove();
      marker = L.marker([lat, lng]).addTo(this.map);
      this.locationSelected.emit({ lat, lng });
    });
  }
}
