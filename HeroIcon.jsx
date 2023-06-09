import { useEffect, useState } from 'react';
const React = require('react');

function Render({ title, titleId, outline, path, ...props }, svgRef) {
  return React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: 1.5,
        stroke: 'currentColor',
        'aria-hidden': 'true',
        ref: svgRef,
        'aria-labelledby': titleId,
      },
      props
    ),
    title
      ? React.createElement(
          'title',
          {
            id: titleId,
          },
          title
        )
      : null,
    React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      d: path,
    })
  );
}

const RenderHeroIcon = React.forwardRef(Render);

// Allows you to dynamically show a Hero Icon (https://heroicons.com/) rather than having to manually import each icon component. You pass in the icon name as a prop, using the name as it is shown on their website rather than the component name which is different (eg. "archive" == "ArchiveIcon" component) -- abstracts away that complexity for you.
export default function HeroIcon({
  icon,
  className = 'w-6 h-6 text-gray-600',
  outline = true,
  onClick = null,
}) {
  if (!icon) return <></>;
  const [theIcon, setTheIcon] = useState({ d: '' });
  useEffect(() => {
    fetch(`/heroIcons/outline/${icon}.json`, { cache: 'force-cache' })
      .then((response) => response.json())
      .then((icon) => {
        setTheIcon(icon);
      });
  }, []);
  return (
    <RenderHeroIcon
      outline={outline}
      path={theIcon.d}
      className={className}
      aria-hidden="true"
      onClick={onClick}
    />
  );
}

export function capitalize(str, all_words = false) {
  /** Function: capitalizes the first letter of a word, and optionally the first letter of each word in the string
   *   @param {string} str - The string to capitalize
   *   @param {boolean} all_words - Whether or not to capitalize each word in the string
   */
  str = all_words ? str.split(' ') : [str];
  return str
    .map((word) => {
      const [first_letter, ...rest] = word;
      return first_letter.toUpperCase() + rest.join('');
    })
    .join(' ');
}
