import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';

const ProfilePage = ({ navigation }) => {
    const route = useRoute();
    const user = route.params?.user;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setError('Password Not Match');
        } else {
            setError('');
            setShowModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            // Handle password update API here
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Profile</Text>
                </View>

                {/* Inputs */}
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                <Text style={styles.label}>Phone No</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="number-pad" />

                {/* Change Password Button */}
                <TouchableOpacity style={styles.changePasswordButton} onPress={() => setShowModal(true)}>
                    <Text style={styles.changePasswordText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

            {/* Password Change Modal */}
            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Change Password</Text>

                            <TouchableOpacity style={styles.closeIcon} onPress={() => setShowModal(false)}>
                                <Icon name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Current Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <Text style={styles.label}>Confirm New Password</Text>
                        <TextInput
                            style={[styles.input, error ? { borderColor: 'red' } : null]}
                            placeholder="Placeholder"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

                        <TouchableOpacity style={styles.saveButtonPopUp} onPress={handleChangePassword}>
                            <Text style={styles.saveButtonText}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 60
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 110,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    label: {
        fontSize: 14,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        color: "#000"
    },
    changePasswordButton: {
        borderWidth: 1,
        borderColor: '#524FE0',
        borderRadius: 8,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    changePasswordText: {
        color: '#524FE0',
        fontWeight: '500',
    },
    footer: {
        paddingBottom: 20,
    },
    saveButton: {
        backgroundColor: '#E85C2B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonPopUp: {
        backgroundColor: '#E85C2B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    closeIcon: {
        alignSelf: 'flex-end',
    },
});

export default ProfilePage;