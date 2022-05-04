import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { JSONEditor } from 'svelte-jsoneditor/dist/jsoneditor.js';
import './SvelteJsonEditor.css';

/**
 * https://codesandbox.io/s/svelte-jsoneditor-react-59wxz?file=/src/SvelteJSONEditor.js
 */
export default (props: any) => {
  const refContainer = useRef(null);
  const refEditor = useRef<any>(null);

  useEffect(() => {
    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props,
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, [props]);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return (
    <div
      style={props.style}
      className="svelte-jsoneditor-react"
      ref={refContainer}
    ></div>
  );
};
