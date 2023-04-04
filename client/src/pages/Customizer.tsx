import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSnapshot } from 'valtio';

import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../Components';
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants';
import { reader } from '../config/helper';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';

export default function Customizer() {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | undefined>();
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;

      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  const readFile = (type: 'logo' | 'full') => {
    if (!file) return;

    reader(file).then((result: string) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };

  // update decal url based on result from file reader
  const handleDecals = (type: 'logo' | 'full', result: string) => {
    const decalType = DecalTypes[type];
    const filterTab = decalType.filterTab as 'logoShirt' | 'stylishShirt';

    state[decalType.stateProperty as 'logoDecal' | 'fullDecal'] = result;

    // if current active tab is not the same as the decal type, toggle the active tab
    if (!activeFilterTab[filterTab]) {
      handleActiveFilterTab(filterTab);
    }
  };

  const handleActiveFilterTab = (tab: 'logoShirt' | 'stylishShirt') => {
    switch (tab) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tab];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tab];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    setActiveFilterTab((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  const handleSubmit = async (type: 'logo' | 'full') => {
    if (!prompt) return alert('Please enter a prompt');

    try {
      // call backend for an ai generated image
      setGeneratingImg(true);

      const response = await fetch('https://threejs-customize-tshirt-server.vercel.app/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro ? (
        <>
          <motion.div className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute top-5 right-5 z-10" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            ></CustomButton>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as 'logoShirt' | 'stylishShirt']}
                handleClick={() => handleActiveFilterTab(tab.name as 'logoShirt' | 'stylishShirt')}
              />
            ))}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
