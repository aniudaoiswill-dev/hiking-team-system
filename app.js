// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // 模态框控制
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    function openModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 人员分工部分功能
    const addMemberBtn = document.getElementById('add-member-btn');
    const teamMembersContainer = document.getElementById('team-members-container');

    // 添加成员
    addMemberBtn.addEventListener('click', function() {
        const memberForm = `
            <form id="add-member-form">
                <div class="mb-4">
                    <label for="member-name" class="block text-sm font-medium text-gray-700 mb-1">成员姓名</label>
                    <input type="text" id="member-name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                </div>
                <div class="mb-4">
                    <label for="member-role" class="block text-sm font-medium text-gray-700 mb-1">担任角色</label>
                    <select id="member-role" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                        <option value="">选择角色</option>
                        <option value="队长">队长</option>
                        <option value="路线规划师">路线规划师</option>
                        <option value="医疗员">医疗员</option>
                        <option value="厨师">厨师</option>
                        <option value="摄影师">摄影师</option>
                        <option value="装备管理员">装备管理员</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label for="member-experience" class="block text-sm font-medium text-gray-700 mb-1">徒步经验</label>
                    <select id="member-experience" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                        <option value="新手">新手</option>
                        <option value="初级">初级</option>
                        <option value="中级">中级</option>
                        <option value="高级">高级</option>
                        <option value="专家">专家</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancel-add-member" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">添加</button>
                </div>
            </form>
        `;
        openModal('添加团队成员', memberForm);

        document.getElementById('cancel-add-member').addEventListener('click', closeModal);
        document.getElementById('add-member-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('member-name').value;
            const role = document.getElementById('member-role').value;
            
            addTeamMember(name, role);
            closeModal();
        });
    });

    function addTeamMember(name, role) {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member-card bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100';
        memberCard.innerHTML = `
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div class="flex items-center space-x-3 mb-4 md:mb-0">
                    <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <i class="fa fa-user text-xl"></i>
                    </div>
                    <div>
                        <h4 class="font-medium">${name}</h4>
                        <p class="text-sm text-gray-500">${role || '队员'}</p>
                    </div>
                </div>
                <div class="flex space-x-3">
                    <button class="edit-member-btn text-primary hover:text-primary/80">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="delete-member-btn text-red-500 hover:text-red-600">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        teamMembersContainer.appendChild(memberCard);
        
        // 添加编辑和删除功能
        addMemberActions(memberCard);
    }

    function addMemberActions(memberCard) {
        const editBtn = memberCard.querySelector('.edit-member-btn');
        const deleteBtn = memberCard.querySelector('.delete-member-btn');
        
        editBtn.addEventListener('click', function() {
            const name = memberCard.querySelector('h4').textContent;
            const role = memberCard.querySelector('p').textContent;
            
            const editForm = `
                <form id="edit-member-form">
                    <div class="mb-4">
                        <label for="edit-member-name" class="block text-sm font-medium text-gray-700 mb-1">成员姓名</label>
                        <input type="text" id="edit-member-name" value="${name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                    <div class="mb-4">
                        <label for="edit-member-role" class="block text-sm font-medium text-gray-700 mb-1">担任角色</label>
                        <select id="edit-member-role" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                            <option value="">选择角色</option>
                            <option value="队长" ${role === '队长' ? 'selected' : ''}>队长</option>
                            <option value="路线规划师" ${role === '路线规划师' ? 'selected' : ''}>路线规划师</option>
                            <option value="医疗员" ${role === '医疗员' ? 'selected' : ''}>医疗员</option>
                            <option value="厨师" ${role === '厨师' ? 'selected' : ''}>厨师</option>
                            <option value="摄影师" ${role === '摄影师' ? 'selected' : ''}>摄影师</option>
                            <option value="装备管理员" ${role === '装备管理员' ? 'selected' : ''}>装备管理员</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancel-edit-member" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                        <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">保存</button>
                    </div>
                </form>
            `;
            openModal('编辑团队成员', editForm);

            document.getElementById('cancel-edit-member').addEventListener('click', closeModal);
            document.getElementById('edit-member-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const newName = document.getElementById('edit-member-name').value;
                const newRole = document.getElementById('edit-member-role').value;
                
                memberCard.querySelector('h4').textContent = newName;
                memberCard.querySelector('p').textContent = newRole || '队员';
                closeModal();
            });
        });
        
        deleteBtn.addEventListener('click', function() {
            memberCard.classList.add('opacity-0');
            memberCard.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                memberCard.remove();
            }, 300);
        });
    }

    // 为现有成员添加操作功能
    document.querySelectorAll('.team-member-card').forEach(addMemberActions);

    // 物资准备部分功能
    const addItemBtn = document.getElementById('add-item-btn');
    const equipmentTableBody = document.getElementById('equipment-table-body');

    // 添加物资
    addItemBtn.addEventListener('click', function() {
        const itemForm = `
            <form id="add-item-form">
                <div class="mb-4">
                    <label for="item-name" class="block text-sm font-medium text-gray-700 mb-1">物资名称</label>
                    <input type="text" id="item-name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                </div>
                <div class="mb-4">
                    <label for="item-type" class="block text-sm font-medium text-gray-700 mb-1">物资类型</label>
                    <select id="item-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                        <option value="露营装备">露营装备</option>
                        <option value="徒步装备">徒步装备</option>
                        <option value="食品">食品</option>
                        <option value="水">水</option>
                        <option value="医疗用品">医疗用品</option>
                        <option value="工具">工具</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="item-quantity" class="block text-sm font-medium text-gray-700 mb-1">数量</label>
                        <input type="number" id="item-quantity" min="1" value="1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                    <div>
                        <label for="item-weight" class="block text-sm font-medium text-gray-700 mb-1">重量 (kg)</label>
                        <input type="number" id="item-weight" step="0.1" min="0" value="0.1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="item-owner" class="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                    <select id="item-owner" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                        <option value="">未分配</option>
                        <option value="张三">张三</option>
                        <option value="李四">李四</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancel-add-item" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                    <button type="submit" class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">添加</button>
                </div>
            </form>
        `;
        openModal('添加物资', itemForm);

        document.getElementById('cancel-add-item').addEventListener('click', closeModal);
        document.getElementById('add-item-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('item-name').value;
            const type = document.getElementById('item-type').value;
            const quantity = document.getElementById('item-quantity').value;
            const weight = document.getElementById('item-weight').value;
            const owner = document.getElementById('item-owner').value;
            
            addEquipmentItem(name, type, quantity, weight, owner);
            closeModal();
            updateEquipmentStats();
        });
    });

    function addEquipmentItem(name, type, quantity, weight, owner) {
        const row = document.createElement('tr');
        row.className = 'border-t';
        row.innerHTML = `
            <td class="py-3 px-4">${name}</td>
            <td class="py-3 px-4">${type}</td>
            <td class="py-3 px-4">${quantity}</td>
            <td class="py-3 px-4">${weight}</td>
            <td class="py-3 px-4">${owner || '未分配'}</td>
            <td class="py-3 px-4">
                <div class="flex space-x-2">
                    <button class="edit-item-btn text-primary hover:text-primary/80">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="delete-item-btn text-red-500 hover:text-red-600">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        equipmentTableBody.appendChild(row);
        
        // 添加编辑和删除功能
        addItemActions(row);
    }

    function addItemActions(row) {
        const editBtn = row.querySelector('.edit-item-btn');
        const deleteBtn = row.querySelector('.delete-item-btn');
        
        editBtn.addEventListener('click', function() {
            const cells = row.querySelectorAll('td');
            const name = cells[0].textContent;
            const type = cells[1].textContent;
            const quantity = cells[2].textContent;
            const weight = cells[3].textContent;
            const owner = cells[4].textContent;
            
            const editForm = `
                <form id="edit-item-form">
                    <div class="mb-4">
                        <label for="edit-item-name" class="block text-sm font-medium text-gray-700 mb-1">物资名称</label>
                        <input type="text" id="edit-item-name" value="${name}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                    <div class="mb-4">
                        <label for="edit-item-type" class="block text-sm font-medium text-gray-700 mb-1">物资类型</label>
                        <select id="edit-item-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                            <option value="露营装备" ${type === '露营装备' ? 'selected' : ''}>露营装备</option>
                            <option value="徒步装备" ${type === '徒步装备' ? 'selected' : ''}>徒步装备</option>
                            <option value="食品" ${type === '食品' ? 'selected' : ''}>食品</option>
                            <option value="水" ${type === '水' ? 'selected' : ''}>水</option>
                            <option value="医疗用品" ${type === '医疗用品' ? 'selected' : ''}>医疗用品</option>
                            <option value="工具" ${type === '工具' ? 'selected' : ''}>工具</option>
                            <option value="其他" ${type === '其他' ? 'selected' : ''}>其他</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label for="edit-item-quantity" class="block text-sm font-medium text-gray-700 mb-1">数量</label>
                            <input type="number" id="edit-item-quantity" min="1" value="${quantity}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                        </div>
                        <div>
                            <label for="edit-item-weight" class="block text-sm font-medium text-gray-700 mb-1">重量 (kg)</label>
                            <input type="number" id="edit-item-weight" step="0.1" min="0" value="${weight}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="edit-item-owner" class="block text-sm font-medium text-gray-700 mb-1">负责人</label>
                        <select id="edit-item-owner" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
                            <option value="" ${owner === '未分配' ? 'selected' : ''}>未分配</option>
                            <option value="张三" ${owner === '张三' ? 'selected' : ''}>张三</option>
                            <option value="李四" ${owner === '李四' ? 'selected' : ''}>李四</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancel-edit-item" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                        <button type="submit" class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">保存</button>
                    </div>
                </form>
            `;
            openModal('编辑物资', editForm);

            document.getElementById('cancel-edit-item').addEventListener('click', closeModal);
            document.getElementById('edit-item-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const newName = document.getElementById('edit-item-name').value;
                const newType = document.getElementById('edit-item-type').value;
                const newQuantity = document.getElementById('edit-item-quantity').value;
                const newWeight = document.getElementById('edit-item-weight').value;
                const newOwner = document.getElementById('edit-item-owner').value;
                
                cells[0].textContent = newName;
                cells[1].textContent = newType;
                cells[2].textContent = newQuantity;
                cells[3].textContent = newWeight;
                cells[4].textContent = newOwner || '未分配';
                closeModal();
                updateEquipmentStats();
            });
        });
        
        deleteBtn.addEventListener('click', function() {
            row.classList.add('opacity-0');
            row.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                row.remove();
                updateEquipmentStats();
            }, 300);
        });
    }

    // 为现有物资添加操作功能
    document.querySelectorAll('#equipment-table-body tr').forEach(addItemActions);

    // 更新物资统计
    function updateEquipmentStats() {
        const rows = document.querySelectorAll('#equipment-table-body tr');
        const totalItems = rows.length;
        
        let totalWeight = 0;
        let unassignedItems = 0;
        const typeCounts = {};
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const weight = parseFloat(cells[3].textContent);
            const type = cells[1].textContent;
            const owner = cells[4].textContent;
            
            totalWeight += weight;
            
            if (owner === '未分配') {
                unassignedItems++;
            }
            
            if (typeCounts[type]) {
                typeCounts[type] += weight;
            } else {
                typeCounts[type] = weight;
            }
        });
        
        const avgWeight = totalItems > 0 ? totalWeight / totalItems : 0;
        
        // 更新统计卡片
        document.querySelector('.text-2xl.font-bold.text-primary').textContent = totalItems;
        document.querySelector('.text-2xl.font-bold.text-secondary').textContent = totalWeight.toFixed(1) + ' kg';
        document.querySelector('.text-2xl.font-bold.text-accent').textContent = avgWeight.toFixed(2) + ' kg';
        document.querySelector('.text-2xl.font-bold.text-dark').textContent = unassignedItems;
        
        // 更新图表
        updateWeightChart(typeCounts);
    }

    // 初始化重量图表
    let weightChart;
    function initWeightChart() {
        const ctx = document.getElementById('weightChart').getContext('2d');
        const initialData = {
            '露营装备': 5.5,
            '徒步装备': 0.8
        };
        
        weightChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(initialData),
                datasets: [{
                    data: Object.values(initialData),
                    backgroundColor: [
                        '#005EB8',  // Suunto蓝色
                        '#00A0DF',  // 浅蓝色
                        '#FF6B00',  // 橙色点缀
                        '#0A1128',  // 深蓝黑色
                        '#3D8BFF',  // 浅蓝
                        '#88C7FF'   // 极浅蓝
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            boxWidth: 12,
                            font: {
                                family: 'Helvetica Neue',
                                size: 12,
                                weight: 400
                            },
                            color: '#0A1128'
                        }
                    }
                },
                cutout: '75%',
                animation: {
                    animateRotate: true,
                    animateScale: false,
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    function updateWeightChart(typeCounts) {
        if (weightChart) {
            weightChart.data.labels = Object.keys(typeCounts);
            weightChart.data.datasets[0].data = Object.values(typeCounts);
            weightChart.update();
        }
    }

    // 天气预报部分功能
    const searchWeatherBtn = document.getElementById('search-weather-btn');
    const locationInput = document.getElementById('location-input');
    
    searchWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        if (location) {
            searchWeatherBtn.disabled = true;
            searchWeatherBtn.innerHTML = '<span class="loading"></span> 查询中...';
            
            // 模拟天气查询
            setTimeout(() => {
                alert(`已查询 ${location} 的天气信息`);
                // 实际项目中这里应该调用天气API
                searchWeatherBtn.disabled = false;
                searchWeatherBtn.textContent = '查询';
            }, 1500);
        } else {
            alert('请输入徒步地点');
        }
    });

    // 初始化温度趋势图表
    function initTemperatureChart() {
        const ctx = document.getElementById('temperatureChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['今天', '明天', '后天', '第4天', '第5天', '第6天', '第7天'],
                datasets: [{
                    label: '最高温度 (°C)',
                    data: [25, 23, 20, 18, 19, 22, 24],
                    borderColor: '#FF6B00',
                    backgroundColor: 'rgba(255, 107, 0, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#FF6B00',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: '最低温度 (°C)',
                    data: [15, 13, 10, 8, 9, 12, 14],
                    borderColor: '#005EB8',
                    backgroundColor: 'rgba(0, 94, 184, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#005EB8',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '°C';
                            },
                            font: {
                                family: 'Helvetica Neue',
                                size: 11
                            },
                            color: '#0A1128'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Helvetica Neue',
                                size: 11
                            },
                            color: '#0A1128'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Helvetica Neue',
                                size: 12,
                                weight: 500
                            },
                            color: '#0A1128',
                            padding: 20,
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 17, 40, 0.9)',
                        titleFont: {
                            family: 'Helvetica Neue',
                            size: 14,
                            weight: 600
                        },
                        bodyFont: {
                            family: 'Helvetica Neue',
                            size: 13
                        },
                        padding: 12,
                        cornerRadius: 6,
                        borderWidth: 0,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y + '°C';
                                return label;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // 路书指引部分功能
    const exportRouteBtn = document.getElementById('export-route-btn');
    const viewFullMapBtn = document.getElementById('view-full-map-btn');
    
    exportRouteBtn.addEventListener('click', function() {
        exportRouteBtn.disabled = true;
        exportRouteBtn.innerHTML = '<span class="loading"></span> 导出中...';
        
        // 模拟导出路书
        setTimeout(() => {
            alert('路书已导出为PDF文件');
            exportRouteBtn.disabled = false;
            exportRouteBtn.innerHTML = '<i class="fa fa-download"></i><span>导出路书</span>';
        }, 1500);
    });
    
    viewFullMapBtn.addEventListener('click', function() {
        alert('查看完整地图功能暂未实现');
    });

    // 应用物资模板
    document.querySelectorAll('.apply-template-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const templateCard = this.closest('.equipment-template');
            const templateName = templateCard.querySelector('h4').textContent;
            
            if (confirm(`确定要应用"${templateName}"模板吗？这将添加一组相关物资到你的清单中。`)) {
                // 根据模板添加物资
                if (templateName === '基础露营套装') {
                    addEquipmentItem('帐篷', '露营装备', '1', '3.5', '');
                    addEquipmentItem('睡袋', '露营装备', '2', '2.0', '');
                    addEquipmentItem('防潮垫', '露营装备', '2', '0.8', '');
                    addEquipmentItem('营地灯', '露营装备', '1', '0.3', '');
                } else if (templateName === '户外饮食套装') {
                    addEquipmentItem('炉头', '工具', '1', '0.5', '');
                    addEquipmentItem('气罐', '工具', '2', '0.4', '');
                    addEquipmentItem('锅具套装', '工具', '1', '1.2', '');
                    addEquipmentItem('食物', '食品', '1', '3.0', '');
                } else if (templateName === '户外医疗包') {
                    addEquipmentItem('急救包', '医疗用品', '1', '0.5', '');
                    addEquipmentItem('常用药品', '医疗用品', '1', '0.3', '');
                    addEquipmentItem('创可贴', '医疗用品', '1', '0.1', '');
                }
                
                updateEquipmentStats();
            }
        });
    });

    // 页面演示功能
    const startButton = document.getElementById('start-button');
    const demoButton = document.getElementById('demo-button');
    
    startButton.addEventListener('click', function() {
        openModal('创建徒步计划', `
            <form id="create-plan-form">
                <div class="mb-4">
                    <label for="plan-name" class="block text-sm font-medium text-gray-700 mb-1">徒步计划名称</label>
                    <input type="text" id="plan-name" placeholder="例如：北京香山徒步环线" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="plan-date" class="block text-sm font-medium text-gray-700 mb-1">徒步日期</label>
                        <input type="date" id="plan-date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                    <div>
                        <label for="plan-duration" class="block text-sm font-medium text-gray-700 mb-1">预计天数</label>
                        <input type="number" id="plan-duration" min="1" value="1" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="plan-location" class="block text-sm font-medium text-gray-700 mb-1">徒步地点</label>
                    <input type="text" id="plan-location" placeholder="例如：北京市海淀区香山公园" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" required>
                </div>
                <div class="mb-6">
                    <label for="plan-description" class="block text-sm font-medium text-gray-700 mb-1">计划描述</label>
                    <textarea id="plan-description" rows="3" placeholder="简单描述你的徒步计划..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"></textarea>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" id="cancel-create-plan" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">创建</button>
                </div>
            </form>
        `);

        document.getElementById('cancel-create-plan').addEventListener('click', closeModal);
        document.getElementById('create-plan-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const planName = document.getElementById('plan-name').value;
            
            alert(`徒步计划"${planName}"创建成功！`);
            closeModal();
            // 滚动到人员分工部分
            document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
        });
    });

    demoButton.addEventListener('click', function() {
        alert('演示功能暂未实现');
    });

    // 初始化图表
    initWeightChart();
    initTemperatureChart();
    
    // 初始化物资统计
    updateEquipmentStats();
});