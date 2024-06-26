import { useMap } from 'react-leaflet';
import { Control, DomUtil } from 'leaflet';
import { colors } from './types';

interface LegendProps {
  colors?: Array<colors>;
}

export default function Legend({ colors }: LegendProps) {
  const map = useMap();
  if (!colors || colors.length === 0) return null;
  const legend = new Control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = DomUtil.create('div', 'info legend');
    const size = 15;
    div.className = 'bg-white w-fit p-2 rounded-lg shadow-md';
    if (colors) {
      colors?.forEach((item) => {
        const color = item.color;
        div.innerHTML += `<div class="flex flex-row"><svg
        xmlns='http://www.w3.org/2000/svg'
        width=${size}
        height=${size}
        viewBox="0 0 ${size + 2} ${size + 2}"
        class="inline mr-2 mb-2"
      >
        <circle
          cx="${size / 2 + 1}"
          cy="${size / 2 + 1}"
          r="${size / 2}"
          fill="${color}"
          stroke='black'
          strokeWidth=0.2
        />
      </svg><i style="background:${color}"></i>${item.name}</div>`;
      });
    }
    return div;
  };
  legend.addTo(map);
  return null;
}
