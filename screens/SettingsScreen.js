import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SettingForm from '../components/SettingForm';
import { useContext } from 'react';
import { LoanContext } from '../context/LoanContext';

const SettingsScreen = () => {
  const { settings, updateSettings } = useContext(LoanContext);

  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSubmit = settings => {
    updateSettings(settings);
  };

  return (
    <View>
      <SettingForm onSubmit={handleSubmit} settings={localSettings} />
    </View>
  );
};

export default SettingsScreen;
